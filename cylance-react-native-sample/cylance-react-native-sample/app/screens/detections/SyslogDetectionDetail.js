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
import {connect} from 'react-redux';

class SyslogDetectionDetail extends Component {
  componentDidMount() {
    //this.props.route.params.syslogdetection;
  }
  render() {
    return (
      <Layout style={styles.container}>
        <SafeAreaView>
          <Layout>
            <Card>
              <Avatar size="tiny" />
              <Text category="h3">
                {this.props.route.params.detection.detection_id}
              </Text>
            </Card>
            <Card>
              <Avatar size="tiny" />
              <Text category="s1">
                {this.props.route.params.detection.event_type}
              </Text>
              <Text category="s1">
                {this.props.route.params.detection.event_name}
              </Text>
              <Text category="s1">
                {this.props.route.params.detection.device_name}
              </Text>
              <Text category="s1">
                {this.props.route.params.detection.file_path}
              </Text>
              <Text category="s1">
                {this.props.route.params.detection.interpreter}
              </Text>
              <Text category="s1">
                {this.props.route.params.detection.interpreter_version}
              </Text>
              <Text category="s1">
                {this.props.route.params.detection.zone_name}
              </Text>
              <Text category="s1">
                {this.props.route.params.detection.user_name}
              </Text>
              <Text category="s1">
                {this.props.route.params.detection.device_id}
              </Text>
              <Text category="s1">
                {this.props.route.params.detection.policy_name}
              </Text>
            </Card>
          </Layout>
        </SafeAreaView>
      </Layout>
    );
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
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SyslogDetectionDetail);
