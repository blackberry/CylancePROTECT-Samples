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
import {combineReducers} from 'redux';
import token from './token/token';
import devices from './devices/devices';
import device from './devices/device';
import user from './users/user';
import users from './users/users';
import threats from './threats/threats';
import threat from './threats/threat';
import queries from './instaQuery/queries';
import queryResults from './instaQuery/queryResults';
import createQuery from './instaQuery/createQuery';
import archiveQuery from './instaQuery/archiveQuery';
import zones from './zones/zones';
import detections from './detections/detections';
import detection from './detections/detection';
import devicedetections from './detections/devicedetections';
import syslogDetections from './detections/syslogDetections';
import syslogDetectionsDevice from './detections/syslogDetectionsDevice';
import unregister from './notifications/unregister';
import settingsTheme from './settings/theme';
import notificationServer from './settings/notificationserver';
import testConnection from './notifications/testConnection';
import lockdown from './lockdown/lockdown';

const rootReducer = combineReducers({
  user,
  token,
  devices,
  users,
  threats,
  device,
  threat,
  queries,
  queryResults,
  zones,
  createQuery,
  archiveQuery,
  detection,
  detections,
  devicedetections,
  syslogDetections,
  unregister,
  settingsTheme,
  notificationServer,
  testConnection,
  syslogDetectionsDevice,
  lockdown,
});

export default rootReducer;
