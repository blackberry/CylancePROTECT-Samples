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
import {SafeAreaView, FlatList} from 'react-native';
import React, {Component} from 'react';
import {
  Card,
  Text,
  Avatar,
  Spinner,
  Layout,
  ListItem,
  Icon,
} from '@ui-kitten/components';
import {connect} from 'react-redux';

import * as userActions from '../../actions/devices/device';
import * as deviceDetectionActions from '../../actions/detections/devicedetections';
import * as syslogDetectionDeviceActions from '../../actions/detections/syslogDetectionsDevice';

class DeviceDetail extends Component {
  componentDidMount() {
    this.props.getDevice(this.props.route.params.device.id);
    this.props.resetDeviceDetections();
    this.props.getSyslogDetectionsWithId(this.props.route.params.device.id);
    this.props.getDeviceDetections(this.props.route.params.device.name);
  }
  render() {
    const DetectionsIcon = (props) => (
      <Icon {...props} name="alert-triangle-outline" />
    );
    const _keyExtractorSyslog = (item, index) => item.detection_id.toString();

    const _keyExtractor = (item, index) => item.Id.toString();

    const device = this.props.route.params.device;
    if (this.props.isGetDeviceLoading) {
      return (
        <Layout style={styles.container}>
          <SafeAreaView>
            <Layout>
              <Card>
                <Avatar size="tiny" />
                <Text category="h3">{`${device.name} `}</Text>
                <Text category="s1">{device.ip_addresses}</Text>
              </Card>

              <Text> Getting Device Data</Text>
              <Spinner size="giant" />
            </Layout>
          </SafeAreaView>
        </Layout>
      );
    } else {
      if (!this.props.isDeviceDetectionsSuccess) {
        return (
          <Layout style={styles.container}>
            <SafeAreaView>
              <Layout>
                <Card>
                  <Avatar size="tiny" />
                  <Text category="h3">{`${device.name} `}</Text>
                  <Text category="s1">{device.ip_addresses}</Text>
                </Card>
                <Card>
                  <Text category="s1"> Info </Text>
                  <Text category="p1"> Policy Name: {device.policy.name} </Text>
                  <Text category="p1">
                    {' '}
                    Registered: {device.date_first_registered}{' '}
                  </Text>
                  <Text category="p1">
                    {' '}
                    Agent Version: {device.agent_version}{' '}
                  </Text>
                  <Text category="p1"> Id: {device.id} </Text>
                  <Text category="p1"> Status: {device.state} </Text>
                </Card>
                <Spinner size="giant" />
              </Layout>
            </SafeAreaView>
          </Layout>
        );
      } else {
        return (
          <Layout style={styles.container}>
            <SafeAreaView>
              <Layout>
                <Card>
                  <Avatar size="tiny" />
                  <Text category="h3">{`${device.name} `}</Text>
                  <Text category="s1">{device.ip_addresses}</Text>
                </Card>
                <Card>
                  <Text category="s1"> Info </Text>
                  <Text category="p1"> Policy Name: {device.policy.name} </Text>
                  <Text category="p1">
                    {' '}
                    Registered: {device.date_first_registered}{' '}
                  </Text>
                  <Text category="p1">
                    {' '}
                    Agent Version: {device.agent_version}{' '}
                  </Text>
                  <Text category="p1"> Id: {device.id} </Text>
                  <Text category="p1"> Status: {device.state} </Text>
                </Card>
                {this.props.deviceDetectionsData.length > 0 && (
                  <Card>
                    <Text category="s1">Cylance Optics Detection Summary</Text>
                    <FlatList
                      data={this.props.deviceDetectionsData}
                      keyExtractor={_keyExtractor}
                      renderItem={({item}) => (
                        <ListItem
                          title={`[${item.Status}]  ${item.DetectionDescription}`}
                          description={`Severity: ${item.Severity}`}
                          accessoryLeft={DetectionsIcon}
                          onEndReachedThreshold={0}
                          onEndReached={() => {
                            this.props.getDeviceDetections(
                              this.props.route.params.device.name,
                            );
                          }}
                          onPress={() =>
                            this.props.navigation.navigate(
                              'DeviceDetectionDetails',
                              {
                                detection: item,
                              },
                            )
                          }
                        />
                      )}
                    />
                  </Card>
                )}
                {this.props.deviceSyslogData.length > 0 && (
                  <Card>
                    <Text category="s1">Syslogs Detection Summary</Text>
                    <FlatList
                      data={this.props.deviceSyslogData}
                      keyExtractor={_keyExtractorSyslog}
                      onEndReachedThreshold={0}
                      renderItem={({item}) => (
                        <ListItem
                          title={`${item.event_type} ${item.event_name}`}
                          description={`${item.device_name}`}
                          accessoryLeft={DetectionsIcon}
                          onPress={() =>
                            this.props.navigation.navigate('SyslogDetail', {
                              detection: item,
                            })
                          }
                        />
                      )}
                    />
                  </Card>
                )}
              </Layout>
            </SafeAreaView>
          </Layout>
        );
      }
    }
  }
}
const styles = {
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
  },
};

function mapStateToProps(state) {
  return {
    singleDeviceData: state.device.data,
    isGetDeviceLoading: state.device.loading,
    isGetDeviceSuccess: state.device.success,
    isGetDeviceError: state.device.isError,
    singleDeviceError: state.device.error,
    isGetDeviceSyslogsLoading: state.syslogDetectionsDevice.loading,
    isGetDeviceSyslogsSuccess: state.syslogDetectionsDevice.success,
    deviceSyslogData: state.syslogDetectionsDevice.data,
    deviceDetectionsData: state.devicedetections.data,
    isDeviceDetectionsLoading: state.devicedetections.loading,
    isDeviceDetectionsSuccess: state.devicedetections.success,
    isDeviceDetectionsError: state.devicedetections.isError,
    deviceDetectionsError: state.devicedetections.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDevice: (device_id) => dispatch(userActions.getDevice(device_id)),
    getDeviceDetections: (deviceName) =>
      dispatch(deviceDetectionActions.getDeviceDetections(deviceName)),
    resetDeviceDetections: () =>
      dispatch(deviceDetectionActions.resetDeviceDetections()),
    getSyslogDetectionsWithId: (device_id) =>
      dispatch(
        syslogDetectionDeviceActions.getSyslogDetectionsWithId(device_id),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetail);
