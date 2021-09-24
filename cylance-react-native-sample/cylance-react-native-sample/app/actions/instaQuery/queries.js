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

export const GET_QUERIES_START = 'GET_QUERIES_START';
export const ALL_QUERIES_COLLECTED = 'ALL_QUERIES_COLLECTED';
export const GET_QUERIES_SUCCESS = 'GET_QUERIES_SUCCESS';
export const GET_QUERIES_ERROR = 'GET_QUERIES_ERROR';
export const RESET_QUERIES = 'RESET_QUERIES';

export const resetInstaQueries = () => (dispatch, getState) => {
  dispatch({type: RESET_QUERIES});
};

export const getNextPageOfInstaQueries = () => (dispatch, getState) => {
  dispatch({type: GET_QUERIES_START});
  const token = getState().token.token;
  const endpoint = getState().token.endpoint;
  const totalPages = getState().queries.totalPages;

  const number_of_items_per_page = 10;

  const number_of_items_captured = getState().queries.data.length;
  const predicted_next_page =
    number_of_items_captured / number_of_items_per_page + 1;

  if (totalPages >= predicted_next_page || totalPages === 0) {
    CylanceAPI.getInstaQueries(
      endpoint,
      token,
      predicted_next_page,
      number_of_items_per_page,
    )
      .then((response) => {
        dispatch({
          type: GET_QUERIES_SUCCESS,
          payload: {
            data: response.data.page_items,
            totalPages: response.data.total_pages,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_QUERIES_ERROR,
          payload: error,
        });
      });
  } else {
    dispatch({
      type: ALL_QUERIES_COLLECTED,
    });
  }
};
