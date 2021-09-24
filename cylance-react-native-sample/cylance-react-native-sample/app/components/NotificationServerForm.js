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
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {
  Text,
  Spinner,
  Button,
  Input,
  Layout,
  Card,
  Toggle,
  Divider,
  Icon,
} from '@ui-kitten/components';
import {Alert} from 'react-native';

const NotificationServerForm = ({props}) => {
  const [checkedExactMatching, setCheckedExactMatching] = React.useState(
    props.isServerEnabled,
  );
  const successIcon = (props) => {
    return <Icon {...props} name={'checkmark-circle-2-outline'} />;
  };
  const failureIcon = (props) => {
    return <Icon {...props} name={'close-circle-outline'} />;
  };

  const [checkedNotifications, setNotifications] = React.useState(
    props.notificationsEnabled,
  );

  const [searchTermsText, setTextSearchTerms] = React.useState(props.baseURL);
  return (
    <Layout style={styles.container} level="1">
      <Card>
        <Text category="h1">Notification Server Settings </Text>
        <Text category="label">
          {`Status: ${
            props.isServerEnabled
              ? 'Server Connection Enabled'
              : 'Server Connection Disabled'
          }`}
        </Text>
        <Toggle
          style={styles.toggle}
          checked={checkedExactMatching}
          onChange={(nextChecked) => {
            setCheckedExactMatching(nextChecked);
            if (nextChecked) {
              props.enableServer();
            } else {
              props.disableServer();
            }
          }}
        />
        {props.isServerEnabled ? (
          <>
            <Text category="label">URL for your Notification Server</Text>

            {props.testConnectionSuccess ? (
              <Input
                placeholder="yourserver.cylancego.com"
                onChangeText={setTextSearchTerms}
                value={searchTermsText}
                accessoryRight={successIcon}
              />
            ) : (
              <Input
                placeholder="yourserver.cylancego.com"
                onChangeText={setTextSearchTerms}
                value={searchTermsText}
                accessoryRight={failureIcon}
              />
            )}

            {props.testConnectionLoading ? (
              <>
                <Button appearance="outline">
                  <Spinner size="small" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  onPress={() => {
                    const emptyString = '';
                    if (searchTermsText === emptyString || !searchTermsText) {
                      Alert.alert(
                        'URL must be a string',
                        'This field cannot be empty',
                      );
                    } else {
                      props.setServerBaseURL(searchTermsText);
                      props.testConnection(searchTermsText);
                    }
                  }}>
                  connect
                </Button>
              </>
            )}

            <Divider />
            <Text>
              {props.testConnectionError
                ? 'Failed to connect to '.concat(props.baseURL).concat('\n')
                : ''}
            </Text>
            <Text>
              {props.testConnectionSuccess
                ? 'Connected to '.concat(props.baseURL).concat('\n')
                : ''}
            </Text>
            {props.testConnectionSuccess ? (
              <>
                <Card>
                  <Text>
                    Would you like to register for SysLog Threat notifications?
                  </Text>
                  <Toggle
                    style={styles.toggle}
                    checked={checkedNotifications}
                    onChange={(nextChecked) => {
                      setNotifications(nextChecked);
                      if (nextChecked) {
                        props.enableNotifications();
                      } else {
                        props.disableNotifications();
                      }
                    }}
                  />
                </Card>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
  text: {
    margin: 10,
    fontSize: 20,
  },
  toggle: {
    alignSelf: 'flex-end',
    textAlign: 'justify',
    margin: 3,
  },
  button: {
    margin: 10,
    fontSize: 20,
    backgroundColor: '#69d03c',
  },
});

export default NotificationServerForm;
