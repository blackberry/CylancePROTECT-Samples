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
let initialState = {
  loading: false,
  success: false,
  isError: false,
  isAllData: false,
  data: [],
  error: '',
  totalPages: 0,
};
import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  ALL_USERS_COLLECTED,
} from '../../actions/users/users';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_USERS_COLLECTED:
      return {
        ...state,
        loading: false,
        success: true,
        isAllData: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
        totalPages: action.payload.totalPages,
        loading: false,
        success: true,
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        devices_error: action.payload,
        loading: false,
        isError: true,
      };
    case GET_USERS_START:
      return {
        ...state,
        loading: true,
        isError: false,
        error: '',
      };
    default:
      return state;
  }
};
export default reducer;
