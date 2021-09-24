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
  loading: false,
  success: false,
  isError: false,
  data: '',
  error: '',
};

import {
  CREATE_QUERY_START,
  CREATE_QUERY_SUCCESS,
  CREATE_QUERY_ERROR,
  RESET_CREATE_QUERY_REDUCER,
} from '../../actions/instaQuery/createQuery';

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case CREATE_QUERY_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true,
      };
    case CREATE_QUERY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isError: true,
      };
    case CREATE_QUERY_START:
      return {
        ...state,
        loading: true,
        isError: false,
        error: '',
      };
    case RESET_CREATE_QUERY_REDUCER:
      return initalState;
    default:
      return state;
  }
};
export default reducer;
