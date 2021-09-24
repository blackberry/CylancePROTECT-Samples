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
export const ENABLE_SERVER = 'ENABLE_SERVER';
export const DISABLE_SERVER = 'DISABLE_SERVER';
export const SET_SERVER_URL = 'SET_SERVER_URL';
export const SET_SERVER_URL_ERROR = 'SET_SERVER_URL_ERROR';
export const DISABLE_NOTIFICATIONS = 'DISABLE_NOTIFICATIONS';
export const ENABLE_NOTIFICATIONS = 'ENABLE_NOTIFICATIONS';
import * as registerActions from '../notifications/register';
import * as unregisterActions from '../notifications/unregister';
import messaging from '@react-native-firebase/messaging';

export const enableNotifications = () => (dispatch, getState) => {
  dispatch({
    type: ENABLE_NOTIFICATIONS,
  });
  messaging()
    .getToken()
    .then((token) => {
      dispatch(registerActions.registerDevice(token));
    });
};

export const disableNotifications = () => (dispatch, getState) => {
  dispatch({
    type: DISABLE_NOTIFICATIONS,
  });
  messaging()
    .getToken()
    .then((token) => {
      dispatch(unregisterActions.unregisterDevice(token));
    });
};

export const enableServer = () => (dispatch, getState) => {
  dispatch({
    type: ENABLE_SERVER,
  });
};
export const disableServer = () => (dispatch, getState) => {
  dispatch({
    type: DISABLE_SERVER,
  });
};
export const setServerBaseURL = (baseUrl) => (dispatch, getState) => {
  dispatch({
    type: SET_SERVER_URL,
    payload: {
      baseUrl: baseUrl,
    },
  });
};
