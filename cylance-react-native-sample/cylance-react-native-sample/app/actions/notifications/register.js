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

export const POST_REGISTER_START = 'POST_REGISTER_START';
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS';
export const POST_REGISTER_ERROR = 'POST_REGISTER_ERROR';

export const registerDevice = (device_notif_id) => (dispatch, getState) => {
  const baseUrl = getState().notificationServer.baseUrl;
  dispatch({type: POST_REGISTER_START});
  NotificationServerAPI.registerDevice(baseUrl, device_notif_id)
    .then((response) => {
      dispatch({
        type: POST_REGISTER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({type: POST_REGISTER_ERROR});
    });
};
