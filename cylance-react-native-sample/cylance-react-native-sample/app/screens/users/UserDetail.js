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
import {SafeAreaView} from 'react-native';
import {Card, Text, Avatar, Spinner, Layout} from '@ui-kitten/components';
import * as userActions from '../../actions/users/user';
import {connect} from 'react-redux';

class UserDetail extends Component {
  componentDidMount() {
    this.props.getUser(this.props.route.params.user.id);
  }
  render() {
    const user = this.props.route.params.user;
    if (this.props.isUserLoading) {
      return (
        <Layout style={styles.container}>
          <SafeAreaView>
            <Layout>
              <Card>
                <Avatar size="tiny" />
                <Text category="h3">
                  {`${user.first_name} `}
                  {user.last_name}
                </Text>
                <Text category="s1">{user.role_name}</Text>
              </Card>

              <Text> Getting User Data</Text>
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
                <Text category="h3">
                  {`${user.first_name} `}
                  {user.last_name}
                </Text>
                <Text category="s1">{user.role_name}</Text>
              </Card>
              <Card>
                <Text category="s1"> Info </Text>
                <Text category="p1"> id: {this.props.userData.id}</Text>
                <Text category="p1"> email: {this.props.userData.email}</Text>
                <Text category="p1">
                  {' '}
                  has_logged_in: {this.props.userData.has_logged_in}
                </Text>
                <Text category="p1">
                  {' '}
                  role_type: {this.props.userData.role_type}
                </Text>
                <Text category="p1">
                  {' '}
                  role_name: {this.props.userData.role_name}
                </Text>
                <Text category="p1">
                  {' '}
                  default_zone_name: {this.props.userData.default_zone_name}
                </Text>
                <Text category="p1">
                  {' '}
                  email_confirmed: {this.props.userData.email_confirmed}
                </Text>
                <Text category="p1">
                  {' '}
                  date_created: {this.props.userData.date_created}
                </Text>
                <Text category="p1">
                  {' '}
                  date_modified: {this.props.userData.date_modified}
                </Text>
              </Card>
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
    userData: state.user.data,
    isUserLoading: state.user.loading,
    isUserSuccess: state.user.success,
    isUserError: state.user.isError,
    userError: state.user.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: (user_id) => dispatch(userActions.getUser(user_id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
