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
import React from 'react';

import 'react-native-gesture-handler';

import {createStackNavigator} from '@react-navigation/stack';

import DeviceScreen from './devices/DeviceScreen';
import UsersScreen from './users/UsersScreen';
import UserDetail from './users/UserDetail';
import DeviceDetail from './devices/DeviceDetail';
import ThreatsScreen from './threats/ThreatsScreen';
import ThreatDetail from './threats/ThreatDetail';
import InstaQueryScreen from './instaQuery/InstaQueryScreen';
import QueriesScreen from './instaQuery/QueriesScreen';
import QueryResultDetail from './instaQuery/QueryResultDetail';
import DetectionsScreen from './detections/DetectionsScreen';
import AllLoggedDetectionsScreen from './detections/SyslogDetectionsScreen';
import SyslogDetail from './detections/SyslogDetectionDetail';
import DetectionsDetail from './detections/DetectionsDetail';

import {ImageBackground, StyleSheet} from 'react-native';

import {
  TopNavigation,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  TabBar,
  Tab,
  Divider,
} from '@ui-kitten/components';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const styles = StyleSheet.create({
  header: {
    height: 128,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#69d03c',
  },
});
//Must inialized this way for TopNavBar because createDrawerNavigator has already used the identifiers Navigator/Screen
const TopTabNav = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const UsersIcon = (props) => <Icon {...props} name="people-outline" />;
const SmartPhoneIcon = (props) => <Icon {...props} name="smartphone-outline" />;
const ThreatsIcon = (props) => <Icon {...props} name="shield-off-outline" />;
const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
const FolderIcon = (props) => <Icon {...props} name="folder-outline" />;

const DetectionsIcon = (props) => (
  <Icon {...props} name="alert-triangle-outline" />
);
export const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="" icon={UsersIcon} />
    <BottomNavigationTab title="" icon={SmartPhoneIcon} />
    <BottomNavigationTab title="" icon={ThreatsIcon} />
    <BottomNavigationTab title="" icon={DetectionsIcon} />
    <BottomNavigationTab title="" icon={SearchIcon} />
  </BottomNavigation>
);

export const DrawerHeader = (props) => (
  <React.Fragment>
    <ImageBackground style={[props.style, styles.header]} />
    <Divider />
  </React.Fragment>
);

export const createUsersStack = (props) => (
  <Stack.Navigator {...props} headerMode="none">
    <Stack.Screen name="Users" component={UsersScreen} />
    <Stack.Screen name="UsersDetail" component={UserDetail} />
  </Stack.Navigator>
);
export const createDevicesStack = (props) => (
  <Stack.Navigator {...props} headerMode="none">
    <Stack.Screen name="Devices" component={DeviceScreen} />
    <Stack.Screen name="DeviceDetails" component={DeviceDetail} />
    <Stack.Screen name="DeviceDetectionDetails" component={DetectionsDetail} />
    <Stack.Screen name="SyslogDetail" component={SyslogDetail} />
  </Stack.Navigator>
);
export const createThreatsStack = (props) => (
  <Stack.Navigator {...props} headerMode="none">
    <Stack.Screen name="Threats" component={ThreatsScreen} />
    <Stack.Screen name="ThreatDetail" component={ThreatDetail} />
  </Stack.Navigator>
);

/* Insta Query Stack */
export const createTopTabNavigatorQueries = (props) => (
  <>
    <TopNavigation alignment="center" />
    <TabNavigatorQueries />
  </>
);
const TabNavigatorQueries = (props) => (
  <TopTabNav.Navigator tabBar={(props) => <TopTabBarQueries {...props} />}>
    <TopTabNav.Screen name="createQuery" component={createInstaQueryStack} />
    <TopTabNav.Screen name="queryHistory" component={createViewQueryStack} />
  </TopTabNav.Navigator>
);

const TopTabBarQueries = ({navigation, state}) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <Tab title="Create Query" />
    <Tab title="History" />
  </TabBar>
);

export const createInstaQueryStack = (props) => (
  <Stack.Navigator {...props} headerMode="none">
    <Stack.Screen name="InstaQuery" component={InstaQueryScreen} />
  </Stack.Navigator>
);

export const createViewQueryStack = (props) => (
  <Stack.Navigator {...props} headerMode="none">
    <Stack.Screen name="Queries" component={QueriesScreen} />
    <Stack.Screen name="QueryResult" component={QueryResultDetail} />
  </Stack.Navigator>
);

/* DETECTIONS TOP BAR STACK CREATION */
export const createTopTabNavigatorDetections = (props) => (
  <>
    <TopNavigation alignment="center" />
    <TabNavigatorDetections />
  </>
);
const TabNavigatorDetections = (props) => (
  <TopTabNav.Navigator tabBar={(props) => <TopTabBarDetections {...props} />}>
    <TopTabNav.Screen name="syslog" component={createSysLogDetectionsStack} />
    <TopTabNav.Screen name="detections" component={createDetectionsStack} />
  </TopTabNav.Navigator>
);

const TopTabBarDetections = ({navigation, state}) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <Tab title="SysLog Detections" />
    <Tab title="Cylance Summaries" />
  </TabBar>
);
export const createDetectionsStack = (props) => (
  <Stack.Navigator {...props} headerMode="none">
    <Stack.Screen name="Detections" component={DetectionsScreen} />
    <Stack.Screen name="DetectionsDetail" component={DetectionsDetail} />
  </Stack.Navigator>
);
export const createSysLogDetectionsStack = (props) => (
  <Stack.Navigator {...props} headerMode="none">
    <Stack.Screen
      name="AllLoggedDetectionsScreen"
      component={AllLoggedDetectionsScreen}
    />
    <Stack.Screen name="SyslogDetail" component={SyslogDetail} />
  </Stack.Navigator>
);
