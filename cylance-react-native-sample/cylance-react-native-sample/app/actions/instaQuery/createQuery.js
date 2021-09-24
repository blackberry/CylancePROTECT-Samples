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
import {
  CylanceAPI,
  StatusCodes,
  convertProtectIDToOpticsID,
} from '../../../library/cylance-apis';

export const CREATE_QUERY_START = 'CREATE_QUERY_START';
export const CREATE_QUERY_SUCCESS = 'CREATE_QUERY_SUCCESS';
export const CREATE_QUERY_ERROR = 'CREATE_QUERY_ERROR';
export const RESET_CREATE_QUERY_REDUCER = 'RESET_CREATE_QUERY_REDUCER';

export const createQuery = (
  name,
  description,
  artifact,
  facet,
  zone_id,
  is_exact_matching,
  is_case_sensitive,
  search_terms,
) => (dispatch, getState) => {
  dispatch({type: CREATE_QUERY_START});

  const token = getState().token.token;
  const endpoint = getState().token.endpoint;

  const payload = {
    name: name,
    description: description,
    artifact: artifact,
    match_value_type: facet,
    match_values: search_terms.trim().split(','),
    case_sensitive: is_case_sensitive,
    zones: [convertProtectIDToOpticsID(zone_id)],
    match_type: is_exact_matching ? 'Exact' : 'Fuzzy',
  };
  CylanceAPI.createInstaQuery(endpoint, token, payload)
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        dispatch({type: CREATE_QUERY_SUCCESS, payload: response.data});
      } else {
        throw response.status;
      }
    })
    .catch((error) => {
      dispatch({
        type: CREATE_QUERY_ERROR,
        payload: StatusCodes[error.response.status],
      });
    });
};

export const resetCreateQueryReducer = () => (dispatch, getState) => {
  dispatch({type: RESET_CREATE_QUERY_REDUCER});
};
