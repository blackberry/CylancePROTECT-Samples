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
  GET_DETECTION_START,
  GET_DETECTION_SUCCESS,
  GET_DETECTION_ERROR,
  RESET_DETECTION,
} from '../../actions/detections/detection';

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_DETECTION_SUCCESS:
      return Object.assign({}, state, {
        data: action.payload,
        loading: false,
        success: true,
      });
    case GET_DETECTION_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false,
        isError: true,
      });
    case GET_DETECTION_START:
      return Object.assign({}, state, {
        loading: true,
        isError: false,
        error: '',
      });
    case RESET_DETECTION:
      return initalState;
    default:
      return state;
  }
};
export default reducer;
