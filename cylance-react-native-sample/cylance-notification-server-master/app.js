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
const Syslog = require('simple-syslog-server');
const express = require('express');
const logger = require('./modules/logger');
const expressModule = require('./modules/routesExpress');
const syslogModule = require('./modules/syslogServer');
/**
 * Initalizing the Restful Express Server
 * Running on HTTP Port 3000 on Localhost
 * see ./modules/routesExpress for logic.
 */
const app = express();
const httpPort = 3000;
app.use(express.json());
app.listen(httpPort, () => {
  logger.log('info', `[Info] Express REST HTTP API Listening @ http://localhost:${httpPort}`);
});
expressModule(app);

/**
 * Initalizing the TCP Syslogs Server
 * Running on TCP port 20512 from Localhost@127.0.0.1
 * See ./modules/syslogServer for logic.
 */
const tcpPort = 20514;
const tcpLocalAddress = '127.0.0.1';
const options = { host: tcpLocalAddress, port: tcpPort };
const server = Syslog.TCP(options);
syslogModule(server, options);
