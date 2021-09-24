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
import React from 'react';
import * as deviceActions from '../../actions/devices/devices';
import * as notificationActions from '../../actions/notifications/register';
import messaging from '@react-native-firebase/messaging';

import {connect} from 'react-redux';
import {
  TopNavigation,
  Text,
  Spinner,
  ListItem,
  Icon,
  Layout,
  Divider,
} from '@ui-kitten/components';

const Smartphone = (props) => <Icon name="smartphone-outline" {...props} />;

class DeviceScreen extends React.Component {
  componentDidMount() {
    this.props.getDevices();
  }
  render() {
    if (this.props.isDeviceLoading) {
      return (
        <Layout style={styles.container}>
          <SafeAreaView>
            <TopNavigation alignment="center" />
            <Divider />
            <Layout>
              <TopNavigation title="" alignment="center" />
              <Spinner size="giant" />
            </Layout>
          </SafeAreaView>
        </Layout>
      );
    } else {
      if (this.props.isDeviceSuccess) {
        return (
          <Layout style={styles.container}>
            <SafeAreaView>
              <TopNavigation alignment="center" title="Your Devices" />
              <Divider />
              <Layout>
                <FlatList
                  data={this.props.deviceData}
                  onEndReachedThreshold={0}
                  onEndReached={() => {
                    this.props.getDevices();
                  }}
                  renderItem={({item}) => (
                    <ListItem
                      title={`${item.name} ${item.state}`}
                      description={`${item.ip_addresses}`}
                      accessoryLeft={Smartphone}
                      onPress={() =>
                        this.props.navigation.navigate('DeviceDetails', {
                          device: item,
                        })
                      }
                    />
                  )}
                />
              </Layout>
            </SafeAreaView>
          </Layout>
        );
      } else {
        return (
          <Layout style={styles.container}>
            <SafeAreaView>
              <TopNavigation alignment="center" />
              <Divider />
              <Layout>
                <TopNavigation title="" alignment="center" />
                <Text category="h4"> Failed to Download Devices </Text>
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
    deviceData: state.devices.data,
    isDeviceLoading: state.devices.loading,
    isDeviceSuccess: state.devices.success,
    isDeviceError: state.devices.isError,
    deviceError: state.devices.error,
    totalPages: state.devices.totalPages,
    isAllData: state.devices.isAllData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getDevices: () => dispatch(deviceActions.getDevices()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DeviceScreen);
