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

export const GET_ZONES_START = 'GET_ZONES_START';
export const GET_ZONES_SUCCESS = 'GET_ZONES_SUCCESS';
export const GET_ZONES_ERROR = 'GET_ZONES_ERROR';

export const getZones = () => (dispatch, getState) => {
  dispatch({type: GET_ZONES_START});
  const token = getState().token.token;
  const endpoint = getState().token.endpoint;
  CylanceAPI.getZones(endpoint, token, 1, 10)
    .then((response) => {
      dispatch({
        type: GET_ZONES_SUCCESS,
        payload: response.data.page_items,
      });
    })
    .catch((error) => {
      dispatch({type: GET_ZONES_ERROR});
    });
};
