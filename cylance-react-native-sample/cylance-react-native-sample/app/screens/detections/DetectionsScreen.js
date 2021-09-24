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
import * as detectionActions from '../../actions/detections/detections';
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

const DetectionIcon = (props) => (
  <Icon name="alert-triangle-outline" {...props} />
);

class DetectionsScreen extends React.Component {
  componentDidMount() {
    this.props.getDetections();
  }
  render() {
    const _keyExtractor = (item, index) => item.Id.toString();
    if (this.props.isDetectionsLoading) {
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
      if (this.props.isDetectionsSuccess) {
        return (
          <Layout style={styles.container}>
            <SafeAreaView>
              <TopNavigation
                alignment="center"
                title="Cylance Optics Detection Summaries"
              />
              <Divider />
              <Layout>
                <FlatList
                  data={this.props.detectionsData}
                  keyExtractor={_keyExtractor}
                  onEndReachedThreshold={0}
                  onEndReached={() => {
                    this.props.getDetections();
                  }}
                  renderItem={({item}) => (
                    <ListItem
                      title={`${item.DetectionDescription} ${item.Severity}`}
                      description={`${item.Status}`}
                      accessoryLeft={DetectionIcon}
                      onPress={() =>
                        this.props.navigation.navigate('DetectionsDetail', {
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
            <SafeAreaView>
              <TopNavigation alignment="center" />
              <Divider />
              <Layout>
                <TopNavigation title="" alignment="center" />
                <Text category="h4"> Failed to Download Detections </Text>
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
    detectionsData: state.detections.data,
    isDetectionsLoading: state.detections.loading,
    isDetectionsSuccess: state.detections.success,
    isDetectionsError: state.detections.isError,
    dectectionsError: state.detections.error,
    totalPages: state.detections.totalPages,
    isAllData: state.detections.isAllData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getDetections: () => dispatch(detectionActions.getDetections()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DetectionsScreen);
