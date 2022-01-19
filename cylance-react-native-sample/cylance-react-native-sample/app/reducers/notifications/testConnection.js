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
};

import {
  TEST_CONNECTION_START,
  TEST_CONNECTION_SUCCESS,
  TEST_CONNECTION_ERROR,
} from '../../actions/notifications/testConnection';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_CONNECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case TEST_CONNECTION_ERROR:
      return {
        ...state,
        loading: false,
        isError: true,
        success: false,
      };
    case TEST_CONNECTION_START:
      return {
        ...state,
        loading: true,
        isError: false,
      };
    default:
      return state;
  }
};
export default reducer;
