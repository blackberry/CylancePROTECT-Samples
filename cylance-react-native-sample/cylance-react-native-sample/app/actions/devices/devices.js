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
export const GET_DEVICES_START = 'GET_DEVICES_START';
export const GET_DEVICES_SUCCESS = 'GET_DEVICES_SUCCESS';
export const GET_DEVICES_ERROR = 'GET_DEVICES_ERROR';
export const ALL_DEVICES_COLLECTED = 'ALL_DEVICES_COLLECTED';

export const getDevices = () => (dispatch, getState) => {
  dispatch({type: GET_DEVICES_START});
  const token = getState().token.token;
  const endpoint = getState().token.endpoint;
  const totalPages = getState().devices.totalPages;
  const number_of_items_captured = getState().devices.data.length;
  const number_of_items_per_page = 10;

  const predicted_next_page =
    number_of_items_captured / number_of_items_per_page + 1;

  if (totalPages >= predicted_next_page || totalPages === 0) {
    CylanceAPI.getDevices(
      endpoint,
      token,
      predicted_next_page,
      number_of_items_per_page,
    )
      .then((response) => {
        dispatch({
          type: GET_DEVICES_SUCCESS,
          payload: {
            data: response.data.page_items,
            totalPages: response.data.total_pages,
          },
        });
      })
      .catch((error) => {
        dispatch({type: GET_DEVICES_ERROR});
      });
  } else {
    dispatch({type: ALL_DEVICES_COLLECTED});
  }
};
