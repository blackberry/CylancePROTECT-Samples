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
import {SafeAreaView, Alert} from 'react-native';
import {
  Card,
  Text,
  Avatar,
  Spinner,
  List,
  ListItem,
  Layout,
  Button,
  TopNavigationAction,
  Icon,
  TopNavigation,
} from '@ui-kitten/components';
import {connect} from 'react-redux';

import * as queryResults from '../../actions/instaQuery/queryResults';
import * as archiveQuery from '../../actions/instaQuery/archiveQuery';
import * as queries from '../../actions/instaQuery/queries';

class QueryResultDetail extends Component {
  componentDidMount() {
    this.props.getQueryResults(this.props.route.params.query.id);
  }
  render() {
    const TrashIcon = (props) => <Icon {...props} name="trash-2-outline" />;
    const query = this.props.route.params.query;

    const renderTrash = () => (
      <TopNavigationAction
        icon={TrashIcon}
        onPress={() => this.props.postArchiveQuery(query.id)}
      />
    );

    if (this.props.isGetQueryResultLoading) {
      return (
        <Layout style={styles.container}>
          <SafeAreaView>
            <Layout>
              <Card>
                <Avatar size="tiny" />
                <Text category="h3">{`${query.name} `}</Text>
                <Text category="s1">{query.id}</Text>
              </Card>
              <Text> Getting Query Data</Text>
              <Spinner size="giant" />
            </Layout>
          </SafeAreaView>
        </Layout>
      );
    } else {
      if (this.props.getQueryResultData.result !== undefined) {
        return (
          <Layout style={styles.container}>
            <SafeAreaView>
              <Layout>
                {this.props.isPostArchiveSuccess &&
                  Alert.alert('Success', 'Archived Query', [
                    {
                      text: 'Continue',
                      onPress: () => {
                        this.props.resetPostArchiveReducer();
                        this.props.resetInstaQueries();
                        this.props.getInstaQueries();
                        this.props.navigation.navigate('Queries');
                      },
                    },
                  ])}
                <TopNavigation
                  alignment="center"
                  accessoryRight={renderTrash}
                  title="Results"
                />
                <Card>
                  <Text category="h2">{`${query.name} `}</Text>
                  <Text category="s1">{`${query.description} `}</Text>
                  <Text>ID: {query.id}</Text>
                  <Text category="s1">
                    {' '}
                    Status: {this.props.getQueryResultData.status}{' '}
                  </Text>
                  <Text category="s1">
                    {' '}
                    Search Results:{' '}
                    {this.props.getQueryResultData.result.length}{' '}
                  </Text>
                  <List
                    data={this.props.getQueryResultData.result}
                    renderItem={({item}) => (
                      <ListItem
                        title={item.HostName}
                        description={
                          'Time Observed: ' +
                          JSON.parse(item.Result).FirstObservedTime +
                          '\n' +
                          'Type: ' +
                          JSON.parse(item.Result).Type +
                          '\n' +
                          'Path: ' +
                          JSON.parse(item.Result).Properties.Path +
                          '\n' +
                          'Sha256: ' +
                          JSON.parse(item.Result).Properties.Sha256 +
                          '\n' +
                          'Owner: ' +
                          JSON.parse(item.Result).Properties.Owner +
                          '\n' +
                          'Suspected File Type: ' +
                          JSON.parse(item.Result).Properties.SuspectedFileType
                        }
                      />
                    )}
                  />
                </Card>
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
                  <Text category="h3">{`${query.name} `}</Text>
                  <Text category="s1">{query.id}</Text>
                  <Button> Archive </Button>
                </Card>
                <Card>
                  <Text category="s1">
                    {' '}
                    Status: {this.props.getQueryResultData.status}{' '}
                  </Text>
                  <Text category="s1"> No results found</Text>
                </Card>
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
    getQueryResultData: state.queryResults.data,
    isGetQueryResultLoading: state.queryResults.loading,
    isGetQueryResultSuccess: state.queryResults.success,
    isError: state.queryResults.isGetQueryResult,
    getQueryResultError: state.queryResults.error,
    isPostArchiveLoading: state.archiveQuery.loading,
    isPostArchiveSuccess: state.archiveQuery.success,
    isPostArchiveError: state.archiveQuery.isError,
    postArchiveData: state.archiveQuery.data,
    postArchiveError: state.archiveQuery.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetInstaQueries: () => dispatch(queries.resetInstaQueries()),
    getQueryResults: (query_id) =>
      dispatch(queryResults.getQueryResults(query_id)),
    postArchiveQuery: (query_id) =>
      dispatch(archiveQuery.postArchiveQuery(query_id)),
    resetPostArchiveReducer: () =>
      dispatch(archiveQuery.resetPostArchiveReducer()),
    getInstaQueries: () => dispatch(queries.getNextPageOfInstaQueries()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryResultDetail);
