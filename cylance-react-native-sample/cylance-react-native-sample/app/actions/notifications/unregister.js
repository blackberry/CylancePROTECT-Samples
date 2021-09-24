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

export const POST_UNREGISTER_START = 'POST_UNREGISTER_START';
export const POST_UNREGISTER_SUCCESS = 'POST_UNREGISTER_SUCCESS';
export const POST_UNREGISTER_ERROR = 'POST_UNREGISTER_ERROR';

export const unregisterDevice = (device_notif_id) => (dispatch, getState) => {
  dispatch({type: POST_UNREGISTER_START});
  const baseUrl = getState().notificationServer.baseUrl;
  NotificationServerAPI.unregisterDevice(baseUrl, device_notif_id)
    .then((response) => {
      dispatch({
        type: POST_UNREGISTER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({type: POST_UNREGISTER_ERROR});
    });
};
