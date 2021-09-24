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
import {CylanceAPI} from '../../../library/cylance-apis';

export const GET_THREAT_START = 'GET_THREAT_START';
export const GET_THREAT_SUCCESS = 'GET_THREAT_SUCCESS';
export const GET_THREAT_ERROR = 'GET_THREAT_ERROR';

export const getThreat = (threat_sha256) => (dispatch, getState) => {
  dispatch({type: GET_THREAT_START});
  const token = getState().token.token;
  const endpoint = getState().token.endpoint;
  CylanceAPI.getThreat(endpoint, token, threat_sha256)
    .then((response) => {
      dispatch({
        type: GET_THREAT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({type: GET_THREAT_ERROR});
    });
};
