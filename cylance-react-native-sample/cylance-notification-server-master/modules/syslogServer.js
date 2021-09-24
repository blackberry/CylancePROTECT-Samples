/* Copyright (c) 2021 BlackBerry Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const FirebaseManager = require('./firebaseManager');
const logger = require('./logger');

const {
  syslogMessageToJSON, createTitleFromJSON, createMessageFromJSON, createPayloadFromJSON,
} = require('./siemParser.js');
const {
  insertDetection, getDevices,
} = require('./databaseFunctions.js');

let listening = false;
const clients = [];
const firebase = new FirebaseManager();

const syslogServer = function syslogServer(server, options) {
  server.on('msg', (data) => {
    logger.log('info', 'Valid Syslog incoming...');
    const messageJSON = syslogMessageToJSON(data.msg);
    insertDetection(messageJSON).then(() => {
      const title = createTitleFromJSON(messageJSON);
      const message = createMessageFromJSON(messageJSON);
      const payload = createPayloadFromJSON(messageJSON);
      logger.log('info', `Syslog: [Debug] ${title} ${message}${payload}`);
      getDevices().then((devices) => {
        firebase
          .sendMessageToDevices(title, message, payload, devices);
      })
        .catch((err) => { logger.log('error', err); });
    });
  })
    .on('invalid', (err) => {
      logger.log('error', `Invalid Syslog Incoming: Could be a test? ${err}`);
      const syslogMessage = "ScriptControl, Event Name: TEST, Device Name: TEST, File Path: [*COMMAND*] PowerShell interactive console, SHA256: fe9b64defd8bf214c7490bb7f35b495a79a95e81f8943ee279dc99998d3d3440, Interpreter: Powershell, Interpreter Version: 10.0.19041.1 (WinBuild.160101.0800), Zone Names: (All Things Zone), User Name: Administrator, Device Id: 8409d91b-f809-4e47-9ec0-0600811c89d3, Policy Name: Matt's CylanceGo Test Policy";
      const syslogMessageJSON = syslogMessageToJSON(syslogMessage);
      insertDetection(syslogMessageJSON).then(() => {
        const title = createTitleFromJSON(syslogMessageJSON);
        const message = createMessageFromJSON(syslogMessageJSON);
        const payload = createPayloadFromJSON(syslogMessageJSON);
        logger.log('info', `[Debug] ${title} ${message}${payload}`);
        getDevices().then((devices) => {
          firebase
            .sendMessageToDevices(title, message, payload, devices);
        })
          .catch((error) => { logger.log('error', error); });
      });
    })
    .on('error', (err) => {
      logger.log('info', 'Cylance Console disconnected abruptly: %o\n', err);
    })
    .on('connection', (s) => {
      const addr = s.address().address;
      logger.log('info', `[Debug] Cylance Console connected: ${addr}\n`);
      clients.push(s);
      s.on('end', () => {
        logger.log('info', `[Debug] Cylance Console: ${addr}\n`);
        const i = clients.indexOf(s);
        if (i !== -1) clients.splice(i, 1);
      });
    })
    .listen(options)
    .then(() => {
      listening = true;
      logger.log('info', `[Info] SYSLOG Server Listening for input on TCP @ tcp://${options.host}:${options.port}`);
    })
    .catch((err) => {
      if ((err.code === 'EACCES') && (options.tcpPort < 1024)) {
        logger.log('error', 'Cannot listen on ports below 1024 without root permissions. Select a higher port number: %o', err);
      } else { // Some other error so attempt to close server socket
        logger.log('error', `Error listening to ${options.host}:${options.port} - %o`, err);
        try {
          if (listening) server.close();
        } catch (error) {
          logger.log('error', `Error trying to close server socket ${options.host}:${options.port} - %o`, err);
        }
      }
    });
};
module.exports = syslogServer;
