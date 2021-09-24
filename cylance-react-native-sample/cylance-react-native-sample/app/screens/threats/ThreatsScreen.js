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

const Shield = (props) => <Icon name="shield-off-outline" {...props} />;

import * as threatsActions from '../../actions/threats/threats';

class ThreatsScreen extends React.Component {
  componentDidMount() {
    this.props.getThreats();
  }
  render() {
    if (this.props.isGetThreatsLoading) {
      return (
        <Layout style={styles.container}>
          <SafeAreaView>
            <TopNavigation alignment="center" />
            <Divider />
            <Layout>
              <Spinner size="giant" />
            </Layout>
          </SafeAreaView>
        </Layout>
      );
    } else {
      if (this.props.isGetThreatsSuccess) {
        return (
          <Layout style={styles.container}>
            <SafeAreaView>
              <TopNavigation alignment="center" title="Threats Found" />
              <Divider />
              <Layout>
                <FlatList
                  data={this.props.getThreatsData}
                  keyExtractor={(item, index) => index.toString()}
                  onEndReachedThreshold={0}
                  onEndReached={() => {
                    this.props.getThreats();
                  }}
                  renderItem={({item}) => (
                    <ListItem
                      title={`${item.classification}: ${item.name}`}
                      description={`Found: ${item.last_found} | ${item.file_size}kb | CylanceScore:${item.cylance_score} `}
                      accessoryLeft={Shield}
                      onPress={() =>
                        this.props.navigation.navigate('ThreatDetail', {
                          threat: item,
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
                <TopNavigation title="Error" alignment="center" />
                <Text category="h4"> Failed to Download Threats </Text>
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
    isAllData: state.threats.isAllData,
    isGetThreatsLoading: state.threats.loading,
    isGetThreatsSuccess: state.threats.success,
    isGetThreatsError: state.threats.isError,
    getThreatsData: state.threats.data,
    getThreatsError: state.threats.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getThreats: () => dispatch(threatsActions.getThreats()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreatsScreen);
