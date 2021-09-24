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

export const TEST_CONNECTION_START = 'TEST_CONNECTION_START';
export const TEST_CONNECTION_SUCCESS = 'TEST_CONNECTION_SUCCESS';
export const TEST_CONNECTION_ERROR = 'TEST_CONNECTION_ERROR';

export const testConnection = (baseUrl) => (dispatch, getState) => {
  dispatch({type: TEST_CONNECTION_START});
  NotificationServerAPI.testConnection(baseUrl)
    .then((response) => {
      dispatch({
        type: TEST_CONNECTION_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({type: TEST_CONNECTION_ERROR});
    });
};
