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
import {NotificationServerAPI} from '../../../library/notification-server-apis';
export const GET_LOGGED_DETECTIONS_DEVICE_START = 'GET_LOGGED_DETECTIONS_DEVICE_START';
export const GET_LOGGED_DETECTIONS_DEVICE_SUCCESS = 'GET_LOGGED_DETECTIONS_DEVICE_SUCCESS';
export const GET_LOGGED_DETECTIONS_DEVICE_ERROR = 'GET_LOGGED_DETECTIONS_DEVICE_ERROR';
export const RESET_LOGGED_DETECTIONS_DEVICE = 'RESET_LOGGED_DETECTIONS_DEVICE';

export const resetAllLoggedDetections = () => (dispatch, getState) => {
  dispatch({type: RESET_LOGGED_DETECTIONS_DEVICE});
};

export const getSyslogDetectionsWithId = (deviceId) => (dispatch, getState) => {
  dispatch({type: GET_LOGGED_DETECTIONS_DEVICE_START});
  const baseUrl = getState().notificationServer.baseUrl;
  NotificationServerAPI.getLoggedDetectionsWithDeviceId(baseUrl, deviceId)
    .then((response) => {
      dispatch({
        type: GET_LOGGED_DETECTIONS_DEVICE_SUCCESS,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_LOGGED_DETECTIONS_DEVICE_ERROR,
        payload: {
          error: error,
        },
      });
    });
};
