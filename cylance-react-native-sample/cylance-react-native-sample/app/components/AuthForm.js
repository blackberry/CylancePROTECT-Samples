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
import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {ServiceEndpoints} from '../../library/cylance-apis';
import messaging from '@react-native-firebase/messaging';

import {
  Text,
  Input,
  Button,
  Layout,
  Card,
  Spinner,
  Icon,
  Select,
  SelectItem,
  IndexPath,
} from '@ui-kitten/components';

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);
const serviceEndpoints = [
  'North America',
  'South America',
  'Asia Pacfic Southeast',
  'Asia Pacfic North',
  'Europe Central',
  'US Government',
];

const getServiceURL = (serviceEndpoint) => {
  switch (serviceEndpoint) {
    case 'North America':
      return ServiceEndpoints.NORTH_AMERICA;
    case 'South America':
      return ServiceEndpoints.SOUTH_AMERICA;
    case 'Asia Pacfic Southeast':
      return ServiceEndpoints.ASIA_PACIFIC_SOUTHEAST;
    case 'Europe Central':
      return ServiceEndpoints.EUROPE_CENTRAL;
    case 'US Government':
      return ServiceEndpoints.US_GOVERNEMENT;
    default:
      return ServiceEndpoints.NORTH_AMERICA;
  }
};

const LockIcon = (props) => <Icon {...props} name="lock-outline" />;

const AuthForm = ({props}) => {
  const renderOption = (title) => <SelectItem title={title} key={title} />;

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const displayValue = serviceEndpoints[selectedIndex.row];

  const [app_id_text, app_id_setText] = useState('');
  const app_id_onChange = (textValue) => app_id_setText(textValue);

  const [app_secret_text, app_secret_setText] = useState('');
  const app_secret_onChange = (textValue) => app_secret_setText(textValue);

  const [tenant_id_text, tenant_id_setText] = useState('');
  const tenant_id_onChange = (textValue) => tenant_id_setText(textValue);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <Layout style={styles.authLayout} level="2">
      <Card style={styles.cardStyle}>
        {props.isGetTokenError &&
          Alert.alert('Failed to Get Token', props.error, [
            {
              text: 'Retry',
              onPress: () =>
                props.getToken(
                  getServiceURL(serviceEndpoints[selectedIndex.row]),
                  app_id_text,
                  app_secret_text,
                  tenant_id_text,
                ),
            },
            {text: 'Okay', onPress: () => props.resetTokenReducer()},
          ])}
        <Text category="h2">Your App Integration Credentials</Text>
        <Text style={styles.text} category="label">
          App ID
        </Text>
        <Input
          placeholder="Your Cylance App ID"
          onChangeText={app_id_onChange}
          value={app_id_text}
        />
        <Text style={styles.text} category="label">
          App Secret
        </Text>
        <Input
          placeholder="Your Cylance App Secret"
          onChangeText={app_secret_onChange}
          value={app_secret_text}
        />
        <Text style={styles.text} category="label">
          {' '}
          Tenet ID
        </Text>
        <Input
          placeholder="Your Cylance Tenant ID"
          onChangeText={tenant_id_onChange}
          value={tenant_id_text}
        />
        <Text style={styles.text} category="label">
          {' '}
          Service Endpoint{' '}
        </Text>
        <Select
          placeholder="Default"
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}>
          {serviceEndpoints.map(renderOption)}
        </Select>
        {props.loading ? (
          <Button
            style={styles.text}
            appearance="outline"
            accessoryLeft={LoadingIndicator}>
            LOADING
          </Button>
        ) : (
          <Button
            onPress={() => {
              props.getToken(
                getServiceURL(serviceEndpoints[selectedIndex.row]),
                app_id_text,
                app_secret_text,
                tenant_id_text,
              );
              messaging()
                .getToken()
                .then((token) => {
                  props.registerDevice(token);
                });
            }}
            style={styles.button}
            accessoryLeft={LockIcon}>
            Authenticate
          </Button>
        )}
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    margin: 20,
  },
  authLayout: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    margin: 10,
    fontSize: 20,
  },
  button: {
    margin: 10,
    fontSize: 20,
    backgroundColor: '#69d03c',
  },
});

export default AuthForm;
