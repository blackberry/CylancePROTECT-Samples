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
import {connect} from 'react-redux';
import {FlatList} from 'react-native';

import {
  TopNavigation,
  Text,
  Spinner,
  ListItem,
  Icon,
  IconRegistry,
  Layout,
  Divider,
  Card,
} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as usersActions from '../../actions/users/users';

const PersonIcon = (props) => <Icon name="person" {...props} />;

class UsersScreen extends Component {
  componentDidMount = () => {
    this.props.getUsers();
  };
  render() {
    if (this.props.isUsersLoading) {
      return (
        <Layout style={styles.container}>
          <SafeAreaView>
            <Layout>
              <TopNavigation alignment="center" title="Users" />
              <Card>
                <Spinner size="giant" />
              </Card>
            </Layout>
          </SafeAreaView>
        </Layout>
      );
    } else {
      return (
        <Layout style={styles.container}>
          <SafeAreaView>
            <TopNavigation alignment="center" title="Users" />
            <Divider />
            <Layout>
              <IconRegistry icons={EvaIconsPack} />

              <FlatList
                data={this.props.usersData}
                onEndReachedThreshold={0}
                onEndReached={() => {
                  this.props.getUsers();
                }}
                renderItem={({item}) => (
                  <ListItem
                    title={`${item.first_name} ${item.last_name}`}
                    description={`${item.email}`}
                    accessoryLeft={PersonIcon}
                    onPress={() =>
                      this.props.navigation.navigate('UsersDetail', {
                        user: item,
                      })
                    }
                  />
                )}
              />
            </Layout>
          </SafeAreaView>
        </Layout>
      );
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
    usersData: state.users.data,
    isUsersLoading: state.users.loading,
    isUsersSuccess: state.users.success,
    isUsersError: state.users.isError,
    usersError: state.users.error,
    totalPages: state.users.totalPages,
    isAllData: state.users.isAllData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(usersActions.getUsers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen);
