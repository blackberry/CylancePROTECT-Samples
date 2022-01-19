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
import * as detectionActions from '../../actions/detections/syslogDetections';
import {connect} from 'react-redux';
import {
  TopNavigation,
  TopNavigationAction,
  Text,
  Spinner,
  ListItem,
  Icon,
  Layout,
  Divider,
} from '@ui-kitten/components';

const DetectionIcon = (props) => (
  <Icon name="alert-triangle-outline" {...props} />
);

class DetectionsScreen extends React.Component {
  componentDidMount() {
    this.props.getAllLoggedDetections();
  }
  render() {
    const RefreshIcon = (props) => <Icon {...props} name="refresh-outline" />;

    const _keyExtractor = (item, index) => item.detection_id.toString();

    const renderRefresh = () => (
      <TopNavigationAction
        icon={RefreshIcon}
        onPress={() => {
          this.props.resetAllLoggedDetections();
          this.props.getAllLoggedDetections();
        }}
      />
    );

    if (!this.props.isServerEnabled) {
      return (
        <Layout style={styles.container}>
          <TopNavigation
            alignment="center"
            accessoryRight={renderRefresh}
            title="Syslogs"
          />
          <Text>
            {' \n '}
            Syslogs detections are provided via the Notification Server which
            can be configured in Settings.
            {' \n '}
            {' \n '}
            You must setup the Notification Server seperately and connect it via
            URL.
          </Text>
        </Layout>
      );
    }

    if (this.props.isDetectionsLoading) {
      return (
        <Layout style={styles.container}>
          <SafeAreaView>
            <TopNavigation
              alignment="center"
              accessoryRight={renderRefresh}
              title="Captured by your SysLogs Server"
            />
            <Divider />
            <Layout>
              <TopNavigation title="" alignment="center" />
              <Spinner size="giant" />
            </Layout>
          </SafeAreaView>
        </Layout>
      );
    } else {
      if (this.props.isDetectionsSuccess) {
        return (
          <Layout style={styles.container}>
            <SafeAreaView>
              <TopNavigation
                alignment="center"
                accessoryRight={renderRefresh}
                title="Captured by your SysLogs Server"
              />
              <Divider />
              <Layout>
                <FlatList
                  data={this.props.detectionsData}
                  keyExtractor={_keyExtractor}
                  onEndReachedThreshold={0}
                  renderItem={({item}) => (
                    <ListItem
                      title={`${item.event_type} ${item.event_name}`}
                      description={`${item.device_name}`}
                      accessoryLeft={DetectionIcon}
                      onPress={() =>
                        this.props.navigation.navigate('SyslogDetail', {
                          detection: item,
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
            <TopNavigation
              alignment="center"
              accessoryRight={renderRefresh}
              title="Captured by your SysLogs Server"
            />
            <SafeAreaView>
              <Divider />
              <Layout>
                <TopNavigation title="" alignment="center" />
                <Text category="h4">{'Error'}</Text>
                {this.props.detectionsError !== '' && <Text>{this.props.detectionsError.message}</Text>}
                {this.props.detectionsError !== '' && 
                  <Text>
                    Unable to GET '{this.props.detectionsError.config.url}'
                  </Text>
                }
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
    isServerEnabled: state.notificationServer.enabled,
    detectionsData: state.syslogDetections.data,
    isDetectionsLoading: state.syslogDetections.loading,
    isDetectionsSuccess: state.syslogDetections.success,
    detectionsError: state.syslogDetections.error,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getAllLoggedDetections: () => {
      dispatch(detectionActions.getAllLoggedDetections())
    },
    resetAllLoggedDetections: () =>
      dispatch(detectionActions.resetAllLoggedDetections()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DetectionsScreen);
