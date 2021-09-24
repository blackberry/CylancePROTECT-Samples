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
let initalState = {
  isValidToken: false,
  loading: false,
  isError: false,
  token: '',
  endpoint: '',
  error: null,
};

import {
  GET_TOKEN_START,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR,
  DELETE_TOKEN,
  RESET_TOKEN_REDUCER,
} from '../../actions/token/token';

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        endpoint: action.payload.endpoint,
        isValidToken: true,
        loading: false,
        isError: false,
      };
    case GET_TOKEN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isError: true,
      };
    case GET_TOKEN_START:
      return {
        ...state,
        loading: true,
        isError: false,
      };
    case DELETE_TOKEN:
      return {
        ...state,
        loading: false,
        isError: false,
        isValidToken: false,
        token: '',
        endpoint: '',
      };
    case RESET_TOKEN_REDUCER:
      return initalState;
    default:
      return state;
  }
};
export default reducer;
