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
export const GET_TOKEN_START = 'GET_TOKEN_START';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const ACCESS_TOKEN_INDEX = 'ACCESS_TOKEN_INDEX';
export const SERVICE_ENDPOINT_INDEX = 'SERVICE_ENDPOINT_INDEX';
export const RESET_TOKEN_REDUCER = 'RESET_TOKEN_REDUCER';

export const getToken = (
  selected_service_endpoint,
  app_id,
  app_secret,
  tenent_id,
) => (dispatch) => {
  dispatch({type: GET_TOKEN_START});
  if (app_id === undefined || app_id === '') {
    dispatch({
      type: GET_TOKEN_ERROR,
      payload: 'must include app id',
    });
    return;
  }

  if (app_secret === undefined || app_secret === '') {
    dispatch({
      type: GET_TOKEN_ERROR,
      payload: 'must include app secret',
    });
    return;
  }

  if (tenent_id === undefined || tenent_id === '') {
    dispatch({
      type: GET_TOKEN_ERROR,
      payload: 'must include tenent_id',
    });
    return;
  }

  CylanceAPI.generateJWTEncoded(app_id, app_secret, tenent_id).then(
    (JWTEncoded) => {
      CylanceAPI.getTokenFromAPI(selected_service_endpoint, JWTEncoded)
        .then((response) => {
          if (response.status === 200) {
            var access_token = response.data.access_token;
            dispatch({
              type: GET_TOKEN_SUCCESS,
              payload: {
                token: access_token,
                endpoint: selected_service_endpoint,
              },
            });
          } else {
            dispatch({
              type: GET_TOKEN_ERROR,
              payload: 'Token Endpoint threw non 200',
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_TOKEN_ERROR,
            payload: error.response.data.message,
          });
        });
    },
  );
};

export const deleteToken = () => (dispatch) => {
  dispatch({type: DELETE_TOKEN});
};

export const resetTokenReducer = () => (dispatch) => {
  dispatch({type: RESET_TOKEN_REDUCER});
};
