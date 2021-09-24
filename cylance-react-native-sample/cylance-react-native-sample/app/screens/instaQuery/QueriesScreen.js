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
import {SafeAreaView, View, FlatList} from 'react-native';
import React from 'react';
import * as queries from '../../actions/instaQuery/queries';
import {connect} from 'react-redux';
import {
  TopNavigation,
  Text,
  Spinner,
  Layout,
  Divider,
  TopNavigationAction,
  Icon,
  Card,
} from '@ui-kitten/components';

class QueriesScreen extends React.Component {
  componentDidMount() {
    this.props.resetQueries();
    this.props.getInstaQueries();
  }
  render() {
    const RefreshIcon = (props) => <Icon {...props} name="refresh-outline" />;

    const renderItemHeader = (headerProps, info) => (
      <View {...headerProps}>
        <Text category="h6">{info.item.name}</Text>
      </View>
    );
    const renderItemFooter = (footerProps, info) => (
      <Text {...footerProps}>{info.item.created_at}</Text>
    );
    const renderItem = (info) => (
      <Card
        status="basic"
        header={(headerProps) => renderItemHeader(headerProps, info)}
        footer={(footerProps) => renderItemFooter(footerProps, info)}
        onPress={() =>
          this.props.navigation.navigate('QueryResult', {
            query: info.item,
          })
        }>
        <Text>
          {'Description:'} {info.item.description} {'\n'}
          {'Artifact Type:'} {info.item.artifact} {'\n'}
          {'Matching Type:'} {info.item.match_value_type} {'\n'}
          {'Searching for:'} {info.item.match_values} {'\n'}
          {'Progress:'} {info.item.progress.responded} {'/'}{' '}
          {info.item.progress.queried} {'\n'}
          {'Results:'}{' '}
          {info.item.results_available ? 'Results Found' : 'No Results'}
        </Text>
      </Card>
    );

    const renderRefresh = () => (
      <TopNavigationAction
        icon={RefreshIcon}
        onPress={() => {
          this.props.resetQueries();
          this.props.getInstaQueries();
        }}
      />
    );

    if (this.props.isGetAllQueriesLoading) {
      return (
        <Layout style={styles.container}>
          <SafeAreaView>
            <TopNavigation alignment="center" title="Your InstaQueries" />
            <Divider />
            <Layout>
              <Text>Loading...</Text>
              <Spinner size="small" />
              <FlatList
                data={this.props.getQueriesData}
                contentContainerStyle={{paddingBottom: 150}}
                onEndReachedThreshold={0}
                renderItem={renderItem}
              />
            </Layout>
          </SafeAreaView>
        </Layout>
      );
    } else {
      if (this.props.isGetAllQueriesSuccess) {
        return (
          <Layout style={styles.container}>
            <SafeAreaView>
              <TopNavigation
                alignment="center"
                accessoryRight={renderRefresh}
                title="Your InstaQueries"
              />
              <Divider />
              <Layout>
                {this.props.isAllData ? (
                  <Text>
                    All Queries Displayed {'('}
                    {this.props.getQueriesData.length}
                    {')'}
                  </Text>
                ) : (
                  <Text>
                    Not all Queries Displayed {'('}
                    {this.props.getQueriesData.length}
                    {')'}
                  </Text>
                )}
                <FlatList
                  data={this.props.getQueriesData}
                  contentContainerStyle={{paddingBottom: 150}}
                  onEndReached={() => {
                    this.props.getInstaQueries();
                  }}
                  onEndReachedThreshold={0.2}
                  renderItem={renderItem}
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
                <Text category="h4">
                  {' '}
                  {this.props.getQueriesError.message}{' '}
                </Text>
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
    isAllData: state.queries.isAllData,
    totalPages: state.queries.totalPages,
    getQueriesData: state.queries.data,
    isGetAllQueriesLoading: state.queries.loading,
    isGetAllQueriesSuccess: state.queries.success,
    isGetAllQueriesError: state.queries.isError,
    getQueriesError: state.queries.error,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getInstaQueries: () => dispatch(queries.getNextPageOfInstaQueries()),
    resetQueries: () => dispatch(queries.resetInstaQueries()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QueriesScreen);
