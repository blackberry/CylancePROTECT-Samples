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

export const POST_ARCHIVE_START = 'POST_ARCHIVE_START';
export const POST_ARCHIVE_SUCCESS = 'POST_ARCHIVE_SUCCESS';
export const POST_ARCHIVE_ERROR = 'POST_ARCHIVE_ERROR';
export const RESET_POST_ARCHIVE_REDUCER = 'RESET_POST_ARCHIVE_REDUCER';

export const postArchiveQuery = (query_id) => (dispatch, getState) => {
  dispatch({type: POST_ARCHIVE_START});
  const token = getState().token.token;
  const endpoint = getState().token.endpoint;

  CylanceAPI.postArchvieInstaQuery(endpoint, token, query_id)
    .then((response) => {
      dispatch({
        type: POST_ARCHIVE_SUCCESS,
        payload: response.data.page_items,
      });
    })
    .catch((error) => {
      dispatch({type: POST_ARCHIVE_ERROR});
    });
};

export const resetPostArchiveReducer = () => (dispatch, getState) => {
  dispatch({type: RESET_POST_ARCHIVE_REDUCER});
};
