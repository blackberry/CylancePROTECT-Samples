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
import axios from 'axios';
/* Whatever BaseURL you have set in the Notfication server environment! */

export const NotificationServerAPI = {
  registerDevice(baseUrl, deviceNotificationID) {
    const registerURL = baseUrl.concat('/register');
    const payload = {
      registration_token: deviceNotificationID,
    };
    const options = {
      headers: {'Content-Type': 'application/json'},
    };
    return axios
      .post(registerURL, payload, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  unregisterDevice(baseUrl, deviceNotificationID) {
    const registerURL = baseUrl.concat('/unregister');
    const payload = {
      registration_token: deviceNotificationID,
    };
    const options = {
      headers: {'Content-Type': 'application/json'},
    };
    return axios
      .post(registerURL, payload, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  testConnection(baseUrl) {
    const registerURL = baseUrl.concat('/ping');
    return axios
      .get(registerURL)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  getLoggedDetections(baseUrl) {
    const registerURL = baseUrl.concat('/detections');
    return axios
      .get(registerURL)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  getLoggedDetectionsWithDeviceId(baseUrl, deviceId) {
    const registerURL = baseUrl.concat('/detections/' + deviceId);
    return axios
      .get(registerURL)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
};
export default NotificationServerAPI;
