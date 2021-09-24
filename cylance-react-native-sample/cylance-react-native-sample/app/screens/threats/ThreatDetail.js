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

import * as threatActions from '../../actions/threats/threat';

class ThreatDetail extends Component {
  componentDidMount() {
    this.props.getThreat(this.props.route.params.threat.sha256);
  }
  render() {
    const threat = this.props.route.params.threat;
    if (this.props.isGetThreatLoading) {
      return (
        <Layout style={styles.container}>
          <SafeAreaView>
            <Layout>
              <Card>
                <Avatar size="tiny" />
                <Text category="h3">{threat.name}</Text>
                <Text category="s1">{threat.classification}</Text>
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
                <Text category="h3">{threat.name}</Text>
                <Text category="s1">{threat.classification}</Text>
              </Card>
              <Card>
                <Text category="s1"> Info </Text>
                <Text category="p1"> SHA: {this.props.threatData.sha256}</Text>
                <Text category="p1"> NAME: {this.props.threatData.name}</Text>
                <Text category="p1"> Md5: {this.props.threatData.md5}</Text>
                <Text category="p1">
                  {' '}
                  Score: {this.props.threatData.cylance_score}
                </Text>
                <Text category="p1">
                  {' '}
                  AV INDUSTRY: {this.props.threatData.av_industry}
                </Text>
                <Text category="p1">
                  {' '}
                  FILE SIZE (kb): {this.props.threatData.file_size}
                </Text>
                <Text category="p1">
                  {' '}
                  CLASSIFICATION: {this.props.threatData.sub_classification}
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
    threatData: state.threat.data,
    isGetThreatLoading: state.threat.loading,
    isGetThreatSuccess: state.threat.success,
    isGetThreatError: state.threat.isError,
    threatError: state.threat.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getThreat: (threat_sha256) =>
      dispatch(threatActions.getThreat(threat_sha256)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreatDetail);
