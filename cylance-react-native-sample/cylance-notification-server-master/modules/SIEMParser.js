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

/**
 *  * convert raw unformatted Syslog output into useable JSON Format.
 *
 *             Limitation: Function currenltly only converts Script Control Syslogs.
 *             for database entry.
 *             Throws catchable "error" when encountered unknown format types.
 *             Future format types would require their own database tables,
 *              and GoCylance implementations.
 *
 * @param {string} rawSyslogsMessage           Raw captured text from Syslog servers
 *                                             incoming message from Cylance Console.
 * @return {Json}           scriptControlJson Json Formatted Data.
 */
function syslogMessageToJSON(rawSyslogsMessage) {
  const commaSplit = rawSyslogsMessage.split(',');
  const syslogType = 0;
  if (commaSplit[syslogType] === 'ScriptControl') {
    const scriptControlJSON = {};
    scriptControlJSON['Event Type'] = commaSplit[syslogType];
    Object.values(commaSplit).forEach((splitObject) => {
      if (splitObject.includes(':')) {
        const colonSplit = splitObject.split(':');
        scriptControlJSON[colonSplit[0].trim()] = colonSplit[1].trim();
      }
    });
    return scriptControlJSON;
  }
  throw (new Error('Unable to convert unimplemented syslogType.'));
}

/**
 *  * generate Message for notifications from preforatted JSON syslog. See: syslogMessageToJSON.
 *
 *             formats JSON into readable notification message text.
 *
 * @param {Json} syslogMessageJSON           Output of syslogMessageToJSON.
 *
 * @return {string}         returns formatted message.
 */
function createMessageFromJSON(syslogMessageJSON) {
  const eventType = syslogMessageJSON['Event Type'];

  if (eventType === 'ScriptControl') {
    const eventName = syslogMessageJSON['Event Name'];
    const deviceName = syslogMessageJSON['Device Name'];
    const interpreter = syslogMessageJSON.Interpreter;
    const message = `${deviceName} ${eventName} ${interpreter}`;
    return message;
  }
  return 'Unknown Event Type';
}

/**
 *  * generate Message for notifications from preforatted JSON syslog. See: syslogMessageToJSON.
 *
 *             formats JSON into readable notification title text.
 *
 * @param {Json} syslogMessageJSON           Output of syslogMessageToJSON.
 *
 * @return {string}         returns formatted title.
 */
function createTitleFromJSON(syslogMessageJSON) {
  const eventType = syslogMessageJSON['Event Type'];

  if (eventType == 'ScriptControl') {
    const eventName = syslogMessageJSON['Event Name'];
    const title = `${eventType} was ${eventName}`;
    return title;
  }
  return 'Unknown Event Type';
}

/**
 *  * generate Payload for notifications from preforatted JSON syslog. See: syslogMessageToJSON.
 *
 *             formats JSON into payload for notification.
 *
 * @param {Json} syslogMessageJSON           Output of syslogMessageToJSON.
 *
 * @return {Json} payload   payload for notification. Used on application side for deep links.
 */
function createPayloadFromJSON(syslogMessageJSON) {
  const eventType = syslogMessageJSON['Event Type'];

  if (eventType === 'ScriptControl') {
    const payload = {};
    payload.device_id = syslogMessageJSON['Device Id'];
    return payload;
  }
  return 'Unknown Event Type';
}

module.exports.syslogMessageToJSON = syslogMessageToJSON;
module.exports.createMessageFromJSON = createMessageFromJSON;
module.exports.createTitleFromJSON = createTitleFromJSON;
module.exports.createPayloadFromJSON = createPayloadFromJSON;
