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
  data: [],
  totalPages: 0,
  isAllData: false,
  error: '',
};

import {
  ALL_DEVICEDETECTIONS_COLLECTED,
  GET_DEVICEDETECTIONS_START,
  GET_DEVICEDETECTIONS_SUCCESS,
  GET_DEVICEDETECTIONS_ERROR,
  RESET_DEVICEDETECTIONS,
} from '../../actions/detections/devicedetections';

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case ALL_DEVICEDETECTIONS_COLLECTED:
      return {
        ...state,
        success: true,
        isAllData: true,
        loading: false,
      };
    case GET_DEVICEDETECTIONS_SUCCESS:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
        totalPages: action.payload.totalPages,
        loading: false,
        success: true,
      };
    case GET_DEVICEDETECTIONS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isError: true,
      };
    case GET_DEVICEDETECTIONS_START:
      return {
        ...state,
        loading: true,
        isError: false,
        error: '',
      };
    case RESET_DEVICEDETECTIONS:
      return initalState;
    default:
      return state;
  }
};
export default reducer;
