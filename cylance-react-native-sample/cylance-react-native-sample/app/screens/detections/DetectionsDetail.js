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

import * as detectionActions from '../../actions/detections/detection';

class DetectionsDetail extends Component {
  componentDidMount() {
    this.props.resetDetection();
    this.props.getDetection(this.props.route.params.detection.Id);
  }
  render() {
    const detection = this.props.route.params.detection;
    if (this.props.isGetDetectionSuccess) {
      const factsPage = 1;
      const detectionDetailsPage = 3;
      const commandLineDetails = this.props.singleDetectionData
        .AssociatedArtifacts[factsPage].CommandLine;
      const description = this.props.singleDetectionData.AssociatedArtifacts[
        factsPage
      ].Description;
      const path = this.props.singleDetectionData.AssociatedArtifacts[
        detectionDetailsPage
      ].Path;

      return (
        <Layout style={styles.container}>
          <SafeAreaView>
            <Layout>
              <Card>
                <Avatar size="tiny" />
                <Text category="h3">{`${detection.DetectionDescription}`}</Text>
                <Text category="s1">{`${detection.Status}  |  ${detection.Severity} Severity`}</Text>
              </Card>
              <Card>
                <Avatar size="tiny" />
                <Text category="s1">{`Name: ${this.props.singleDetectionData.Name} `}</Text>
                <Text category="s1">{`Id: ${this.props.singleDetectionData.Id} `}</Text>
                <Text category="s1">{`CMD: ${commandLineDetails} `}</Text>
                <Text category="s1">{`Description: ${description} `}</Text>
                <Text category="s1">{`Path: ${path} `}</Text>
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
              <Text category="h3">Loading</Text>
              <Spinner size="giant" />
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
    singleDetectionData: state.detection.data,
    isGetDetectionLoading: state.detection.loading,
    isGetDetectionSuccess: state.detection.success,
    isGetDetectionError: state.detection.isError,
    singleDetectionError: state.detection.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetection: (detectionId) =>
      dispatch(detectionActions.getDetection(detectionId)),
    resetDetection: () => dispatch(detectionActions.resetDetection()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetectionsDetail);
