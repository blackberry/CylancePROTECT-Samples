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

export const GET_USERS_START = 'GET_USERS_START';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';
export const ALL_USERS_COLLECTED = 'ALL_USERS_COLLECTED';

export const getUsers = () => (dispatch, getState) => {
  dispatch({type: GET_USERS_START});
  const token = getState().token.token;
  const endpoint = getState().token.endpoint;
  const totalPages = getState().users.totalPages;

  const number_of_items_captured = getState().users.data.length;
  const number_of_items_per_page = 10;

  const predicted_next_page =
    number_of_items_captured / number_of_items_per_page + 1;

  if (totalPages >= predicted_next_page || totalPages === 0) {
    CylanceAPI.getUsers(
      endpoint,
      token,
      predicted_next_page,
      number_of_items_per_page,
    )
      .then((response) => {
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: {
            data: response.data.page_items,
            totalPages: response.data.total_pages,
          },
        });
      })
      .catch((error) => {
        dispatch({type: GET_USERS_ERROR});
      });
  } else {
    dispatch({type: ALL_USERS_COLLECTED});
  }
};
