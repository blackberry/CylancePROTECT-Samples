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
import React, {Component} from 'react';

import 'react-native-gesture-handler';
import {connect} from 'react-redux';
import AuthForm from './components/AuthForm';
import SettingsScreen from './screens/settings/SettingsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as tokenActions from './actions/token/token';
import * as notificationActions from './actions/notifications/register';
import * as eva from '@eva-design/eva';
import {Alert} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as unregisterActions from './actions/notifications/unregister';
import * as themeActions from './actions/settings/theme';
import {
  DrawerHeader,
  BottomTabBar,
  createUsersStack,
  createDevicesStack,
  createThreatsStack,
  createTopTabNavigatorDetections,
  createTopTabNavigatorQueries,
} from './screens/HomeNavigation';

import {
  ApplicationProvider,
  TopNavigation,
  IconRegistry,
  Drawer,
  DrawerItem,
  IndexPath,
} from '@ui-kitten/components';
import messaging from '@react-native-firebase/messaging';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

//Must inialized this way for TopNavBar because createDrawerNavigator has already used the identifiers Navigator/Screen
const {Navigator, Screen} = createDrawerNavigator();

const BottomTab = createBottomTabNavigator();

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    messaging()
      .getToken()
      .then((token) => {});
  }
}

class ReduxAsyncApp extends Component {
  componentDidMount() {
    requestUserPermission();
    messaging().onMessage(async (remoteMessage) => {
      const notification = remoteMessage;
      Alert.alert(
        notification.notification.title,
        notification.notification.body,
      );
    });
  }

  render() {
    const BottomTabNavigator = () => (
      <BottomTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <BottomTab.Screen name="UsersStack" component={createUsersStack} />
        <BottomTab.Screen name="DevicesStack" component={createDevicesStack} />
        <BottomTab.Screen name="ThreatsStack" component={createThreatsStack} />
        <BottomTab.Screen
          name="Detections"
          component={createTopTabNavigatorDetections}
        />
        <BottomTab.Screen
          name="InstaQueryStack"
          component={createTopTabNavigatorQueries}
        />
      </BottomTab.Navigator>
    );

    const HomeScreen = (props) => (
      <>
        {this.props.isValidToken ? (
          <>
            <BottomTabNavigator />
          </>
        ) : (
          <>
            <TopNavigation alignment="center" />
            <AuthForm props={this.props}> </AuthForm>
          </>
        )}
      </>
    );

    const DrawerContent = ({navigation, state}) => (
      <Drawer
        header={DrawerHeader}
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}>
        <DrawerItem title="Home" />
        <DrawerItem title="Settings" />
      </Drawer>
    );

    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva[this.props.theme]}>
          <NavigationContainer>
            <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
              <Screen name="Home" component={HomeScreen} />
              <Screen name="Settings" component={SettingsScreen} />
            </Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isValidToken: state.token.isValidToken,
    loading: state.token.loading,
    error: state.token.error,
    isGetTokenError: state.token.isError,
    theme: state.settingsTheme.theme,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    switchTheme: () => dispatch(themeActions.switchTheme()),
    deleteToken: () => dispatch(tokenActions.deleteToken()),
    registerDevice: (device_id) =>
      dispatch(notificationActions.registerDevice(device_id)),
    getToken: (selectedServiceEndpoint, app_id, app_secret, tenent_id) =>
      dispatch(
        tokenActions.getToken(
          selectedServiceEndpoint,
          app_id,
          app_secret,
          tenent_id,
        ),
      ),
    resetTokenReducer: () => dispatch(tokenActions.resetTokenReducer()),
    unregisterDevice: (device_notification_id) =>
      dispatch(unregisterActions.unregisterDevice(device_notification_id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxAsyncApp);
