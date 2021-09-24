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
import * as tokenActions from '../../actions/token/token';
import * as unregisterActions from '../../actions/notifications/unregister';
import * as registerActions from '../../actions/notifications/register';
import * as themeActions from '../../actions/settings/theme';
import * as notificationServerActions from '../../actions/settings/notificationserver';
import * as testConnection from '../../actions/notifications/testConnection';
import messaging from '@react-native-firebase/messaging';
import {SafeAreaView} from 'react-native';
import NotificationServerForm from '../../components/NotificationServerForm';

import {Alert, StyleSheet} from 'react-native';
import {
  TopNavigation,
  Card,
  Button,
  Icon,
  Layout,
  Divider,
  Text,
  Input,
} from '@ui-kitten/components';
import {connect} from 'react-redux';

class SettingsScreen extends Component {
  componentDidMount() {}
  render() {
    const SettingsIcon = (props) => <Icon {...props} name="log-out-outline" />;

    return (
      <>
        {this.props.isValidToken ? (
          <>
            <Layout style={styles.container}>
              <SafeAreaView>
                <Card>
                  <Text> Theme Settings </Text>
                  <Divider />

                  <Button onPress={() => this.props.switchTheme()}>
                    Switch to{' '}
                    {this.props.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </Button>
                </Card>
                <Divider />
                <Card>
                  <Text> Account Settings </Text>
                  <Divider />

                  <Button
                    style={styles.button}
                    onPress={() => {
                      this.props.resetTokenReducer();
                      messaging()
                        .getToken()
                        .then((token) => {
                          this.props.unregisterDevice(token);
                          Alert.alert(
                            'Logged Out',
                            'API Token deleted, and unregistered from Notifications!',
                            {
                              text: 'Okay',
                            },
                          );
                        });
                    }}
                    accessoryLeft={SettingsIcon}>
                    Sign out of account
                  </Button>

                  <NotificationServerForm props={this.props} />
                </Card>
              </SafeAreaView>
            </Layout>
          </>
        ) : (
          <>
            <Layout style={styles.container}>
              <SafeAreaView>
                <Card>
                  <Button onPress={() => this.props.switchTheme()}>
                    Switch to{' '}
                    {this.props.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </Button>
                </Card>
              </SafeAreaView>
            </Layout>
          </>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 128,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    margin: 10,
    fontSize: 20,
    backgroundColor: '#69d03c',
  },
  container: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    theme: state.settingsTheme.theme,
    isValidToken: state.token.isValidToken,
    isServerEnabled: state.notificationServer.enabled,
    baseURL: state.notificationServer.baseUrl,
    testConnectionLoading: state.testConnection.loading,
    testConnectionSuccess: state.testConnection.success,
    testConnectionError: state.testConnection.isError,
    notificationsEnabled: state.notificationServer.notificationsEnabled,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    enableNotifications: () =>
      dispatch(notificationServerActions.enableNotifications()),
    disableNotifications: () =>
      dispatch(notificationServerActions.disableNotifications()),
    switchTheme: () => dispatch(themeActions.switchTheme()),
    resetTokenReducer: () => dispatch(tokenActions.resetTokenReducer()),
    unregisterDevice: (device_notification_id) =>
      dispatch(unregisterActions.unregisterDevice(device_notification_id)),
    enableServer: () => dispatch(notificationServerActions.enableServer()),
    disableServer: () => dispatch(notificationServerActions.disableServer()),
    setServerBaseURL: (baseUrl) =>
      dispatch(notificationServerActions.setServerBaseURL(baseUrl)),
    testConnection: (baseUrl) =>
      dispatch(testConnection.testConnection(baseUrl)),
    registerDevice: (device_id) =>
      dispatch(registerActions.registerDevice(device_id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
