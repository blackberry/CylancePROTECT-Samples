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
import React from 'react';
import {SafeAreaView} from 'react-native';

import {connect} from 'react-redux';
import {
  Text,
  Spinner,
  Card,
  TopNavigation,
  Divider,
  Layout,
} from '@ui-kitten/components';
import CreateQueryForm from '../../components/CreateQueryForm';
import * as createQuery from '../../actions/instaQuery/createQuery';
import * as zones from '../../actions/zones/zones';
import * as queries from '../../actions/instaQuery/queries';
class InstaQueryScreen extends React.Component {
  componentDidMount() {
    this.props.getZones();
  }
  render() {
    //          this.props.navigation.navigate('Queries');
    //Get the zones of the user to display them on the form.
    if (this.props.isGetZonesLoading) {
      return (
        <Layout style={styles.container}>
          <SafeAreaView>
            <TopNavigation alignment="center" />
            <Divider />
            <Layout>
              <Text category="h1"> Preparing form..</Text>
              <Spinner size="giant" />
            </Layout>
          </SafeAreaView>
        </Layout>
      );
    } else {
      //zones are downloaded
      if (this.props.isGetZonesSuccess) {
        //Not loading anything, form is available, as well as queries
        return (
          <Layout style={styles.container}>
            <SafeAreaView>
              <TopNavigation alignment="center" title="InstaQuery" />
              <Divider />
              <Layout>
                <CreateQueryForm props={this.props} />
              </Layout>
            </SafeAreaView>
          </Layout>
        );
      }
      //Error downloading the zones
      else {
        return (
          <Layout style={styles.container}>
            <SafeAreaView>
              <TopNavigation alignment="center" />
              <Divider />
              <Layout>
                <Card>
                  <Text> Error Downloading Zones! </Text>
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
    //Zones reducers
    zonesData: state.zones.data,
    isGetZonesLoading: state.zones.loading,
    isGetZonesSuccess: state.zones.success,
    isGetZonesError: state.zones.isError,
    zonesError: state.zones.error,
    //create query reducers
    isCreateInstaQueryLoading: state.createQuery.loading,
    isCreateInstaQuerySuccess: state.createQuery.success,
    isCreateInstaQueryError: state.createQuery.isError,
    createInstaQueryData: state.createQuery.data,
    createInstaQueryError: state.createQuery.error,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    resetCreateQueryReducer: () =>
      dispatch(createQuery.resetCreateQueryReducer()),
    getZones: () => dispatch(zones.getZones()),
    getInstaQueries: () => dispatch(queries.getNextPageOfInstaQueries()),
    resetInstaQueries: () => dispatch(queries.resetInstaQueries()),
    createQuery: (
      name,
      description,
      artifact,
      facet,
      zone_id,
      is_exact_matching,
      is_case_sensitive,
      search_terms,
    ) =>
      dispatch(
        createQuery.createQuery(
          name,
          description,
          artifact,
          facet,
          zone_id,
          is_exact_matching,
          is_case_sensitive,
          search_terms,
        ),
      ),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(InstaQueryScreen);
