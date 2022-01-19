import React from 'react';
import {SafeAreaView} from 'react-native';

import {
  TopNavigation,
  Divider,
  Layout,
} from '@ui-kitten/components';
import LockdownForm from '../../components/LockdownForm';
import * as lockdown from '../../actions/lockdown/lockdown';
import {connect} from 'react-redux';


class LockdownScreen extends React.Component {
    componentDidMount() {}

    render() {
      const deviceId = this.props.route.params.deviceId;

      return(
        <Layout style={styles.container}>
          <SafeAreaView>
            <TopNavigation alignment="center" title="Quarantine Device" />
            <Divider />
            <Layout>
              <LockdownForm
              deviceId={deviceId}
              props={this.props}/>
            </Layout>
          </SafeAreaView>
        </Layout>
      )
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
    loading: state.lockdown.loading,
    success: state.lockdown.success,
    data: state.lockdown.data,
    isError: state.lockdown.isError,
    error: state.lockdown.error,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    lockdownDevice: lockdownDevice = (device_id, days, hours, minutes) => 
      dispatch(
        lockdown.lockdownDevice(device_id, days, hours, minutes)
      ),
    resetLockdownReducer: resetLockdownReducer = () => dispatch(lockdown.resetLockdownReducer())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LockdownScreen);