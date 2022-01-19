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
  GET_QUERIES_START,
  GET_QUERIES_SUCCESS,
  GET_QUERIES_ERROR,
  ALL_QUERIES_COLLECTED,
  RESET_QUERIES,
} from '../../actions/instaQuery/queries';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_QUERIES_COLLECTED:
      return {
        ...state,
        loading: false,
        success: true,
        isAllData: true,
      };
    case GET_QUERIES_SUCCESS:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
        totalPages: action.payload.totalPages,
        loading: false,
        success: true,
      };
    case GET_QUERIES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isError: true,
      };
    case GET_QUERIES_START:
      return {
        ...state,
        loading: true,
        isError: false,
        success: false,
      };
    case RESET_QUERIES:
      return initialState;

    default:
      return state;
  }
};
export default reducer;
