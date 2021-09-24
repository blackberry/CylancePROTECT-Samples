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

/* Express HTTP Server to register devices */
const logger = require('./logger');
const {
  insertDevice, getDetectionWithDeviceID, getDetections, unregisterDevice,
} = require('./databaseFunctions');

const expressRoutes = function routes(app) {
  app.post('/register', (req, res) => {
    const { registration_token } = req.body;

    insertDevice(registration_token).then((response) => {
      res.send(response);
    }).catch((responseError) => {
      res.send(responseError);
    });
  });

  app.get('/detections/:device_id', (req, res) => {
    const { device_id } = req.params;
    if (device_id === undefined || device_id == null) {
      const errorResponse = {
        response: 'error',
        message: 'missing device_id from request params',
      };
      res.send(errorResponse);
      return;
    }
    getDetectionWithDeviceID(device_id).then((response) => {
      res.send(response);
    }).catch((responseError) => {
      res.send(responseError);
    });
  });
  app.get('/ping', (req, res) => {
    res.send('pong');
  });
  app.get('/detections', (req, res) => {
    getDetections().then((response) => {
      res.send(response);
    }).catch((responseError) => {
      res.send(responseError);
    });
  });
  app.post('/unregister', (req, res) => {
    const { registration_token } = req.body;

    if (registration_token === undefined) {
      logger.log('info', 'API User failed to provide a registration token in body');
      const response = {
        response: 'error',
        message: 'you did not provide a registration_token to unregister',
      };
      res.send(response);
    } else {
      unregisterDevice(registration_token).then((response) => {
        res.send(response);
      }).catch((responseError) => {
        res.send(responseError);
      });
    }
  });
};

module.exports = expressRoutes;
