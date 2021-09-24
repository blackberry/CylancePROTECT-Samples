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

const databaseSignleton = require('./databaseManager');
const logger = require('./logger');

/**
 *  * Insert a JSON formatted Syslogs Detection Into the Database.
 *
 *
 * @param {Json} detectionJSON           -> Output of syslogMessageToJSON.
 *
 * @return {Promise}       returns Promise
 * @resolve {Nothing}, acts as implict proof of success
 * @reject {Error} returns error object to handle
 */
async function insertDetectionIntoDatabase(detectionJSON) {
  databaseSignleton.get().then((database) => new Promise((resolve, reject) => {
    const sql = 'INSERT INTO detections VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    const localDatabaseId = null;
    const values = [
      localDatabaseId,
      detectionJSON['Event Type'],
      detectionJSON['Event Name'],
      detectionJSON['Device Name'],
      detectionJSON['File Path'],
      detectionJSON.Interpreter,
      detectionJSON['Interpreter Version'],
      detectionJSON['Zone Names'],
      detectionJSON['User Name'],
      detectionJSON['Device Id'],
      detectionJSON['Policy Name'],
    ];
    database.run(sql, values, (error) => {
      if (error) {
        logger.log('error', '(detections) unable to insert into database');
        reject(error);
      } else {
        resolve();
      }
    });
  }));
}
/**
 *  * unregister a device from the notification Server
 *
 *             Removes the desireed Registration Token from database
 *
 * @param {string} registrationToken    Firebase Cloud Messenger Device Token. See react native app.
 *
 * @return {Promise}         returns Promise.
 * @resolve {json} json of success, returned by restful api.
 * @reject {json} json of failure, returned by restful api.
 */
async function unregisterDevice(registrationToken) {
  return new Promise((resolve, reject) => {
    databaseSignleton.get().then((database) => {
      const sql = `DELETE FROM devices WHERE registration_token=\'${registrationToken}\'`;
      database.run(sql, (error) => {
        if (error) {
          logger.log('info', '[Unregister Warning] Failed to unregister user. Does not exist in table');
          const responseError = {
            response: 'error',
            message: 'Failed to unregister user. Does not exist in table',
          };
          reject(responseError);
        } else {
          logger.log('info', `[Unregister Success] Device was unregistered from recieving notifications${registrationToken}`);
          const response = {
            response: 'success',
            message: 'device unregistered from notifications',
          };
          resolve(response);
        }
      });
    });
  });
}
/**
 *  * register a device from the notification Server
 *
 *             inserts the desired Registration Token into the database
 *
 * @param {string} registrationToken    Firebase Cloud Messenger Device Token. See react native app.
 *
 * @return {Promise}         returns Promise.
 * @resolve {json} json of success, returned by restful api.
 * @reject {json} json of failure, returned by restful api.
 */
async function insertDevice(registrationToken) {
  return new Promise((resolve, reject) => {
    databaseSignleton.get().then((database) => {
      const query = 'INSERT INTO devices VALUES (?)';
      const values = [registrationToken];

      database.run(query, values, (error) => {
        if (error) {
          logger.log('error', '[Register Warning] DEVICE ALREADY EXISTS, CANNOT REGISTER TWICE!');
          const errorResponse = {
            response: 'error',
            message: 'device already registered',
          };
          reject(errorResponse);
        } else {
          logger.log('info', `[Register Success] New Device Registered:  ${registrationToken}`);
          const response = {
            response: 'success',
            message: 'device registered',
          };
          resolve(response);
        }
      });
    });
  });
}
/**
 *  * gets all syslog detections from the database.
 *
 * @return {Promise}         returns Promise.
 * @resolve {json} json of success, returned by restful api. Includes all detections in ['data']
 * @reject {json} json of failure, returned by restful api.
 */
async function getDetections() {
  return new Promise((resolve, reject) => {
    databaseSignleton.get().then((database) => {
      logger.log('info', '[Debug] GET:/detections/ Serving user detections');

      const query = 'SELECT * FROM detections';

      database.all(query, (error, rows) => {
        if (error) {
          logger.log('error', '[Register Warning] DEVICE ALREADY EXISTS, CANNOT REGISTER TWICE!');
          const errorResponse = {
            response: 'error',
            message: error,
          };
          reject(errorResponse);
        } else {
          const response = {
            response: 'success',
            message: `found ${rows.length} rows of detections`,
            data: rows,
          };
          resolve(response);
        }
      });
    });
  });
}
/**
 *  * gets all syslog detections from the database that share a given Cylance Optics Device ID.
 *
 * @param {string} deviceId  Device Id (from Cylance Optics) that refers to a given physical device.
 *
 * @return {Promise}         returns Promise.
 * @resolve {json} json of success, returned by restful api. Inclues all detections in ['data']
 * @reject {json} json of failure, returned by restful api.
 */
async function getDetectionWithDeviceID(deviceId) {
  return new Promise((resolve, reject) => {
    databaseSignleton.get().then((database) => {
      logger.log('info', `[Debug] GET:/detections/${deviceId} Serving user device's detections`);

      const query = `SELECT * FROM detections WHERE device_id=\'${deviceId}\'`;

      database.all(query, (error, rows) => {
        if (error) {
          logger.log('error', '[Register Warning] DEVICE ALREADY EXISTS, CANNOT REGISTER TWICE!');
          const errorResponse = {
            response: 'error',
            message: error,
          };
          reject(errorResponse);
        } else {
          const response = {
            response: 'success',
            device_id: deviceId,
            message: `found ${rows.length} rows of detections related to device ${deviceId}`,
            data: rows,
          };
          resolve(response);
        }
      });
    });
  });
}
/**
 *  * Get all registration tokens from the database.
 *
 *             Used to send a notification to all registered devices.
 *
 *
 * @return {array}         Array of strings. Strings = registration tokens.
 */
async function getDevices() {
  return new Promise((resolve, reject) => {
    databaseSignleton.get().then((database) => {
      const query = 'SELECT registration_token FROM devices';
      database.all(query, (_error, rows) => {
        if (_error) {
          logger.log('error', '(devices) unable to select from database');
          reject(_error);
        } else {
          resolve(rows);
        }
      });
    });
  });
}

module.exports.insertDetection = insertDetectionIntoDatabase;
module.exports.getDevices = getDevices;
module.exports.insertDevice = insertDevice;
module.exports.getDetectionWithDeviceID = getDetectionWithDeviceID;
module.exports.getDetections = getDetections;
module.exports.unregisterDevice = unregisterDevice;
