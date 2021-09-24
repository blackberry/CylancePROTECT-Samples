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
import {StyleSheet, Alert, View} from 'react-native';
import React from 'react';
import {
  Text,
  Button,
  Input,
  SelectItem,
  Select,
  Layout,
  IndexPath,
  Card,
  Divider,
  SelectGroup,
  Spinner,
  Icon,
  Toggle,
} from '@ui-kitten/components';

const SendQuery = (props) => <Icon {...props} name="paper-plane-outline" />;

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

const CreateQuery = ({props}) => {
  const ArtifactFacetsAvailable = {
    File: ['Path', 'Md5', 'Sha2', 'Owner', 'CreationDateTime'],
    NetworkConnection: ['DestAddr', 'DestPort'],
    Process: [
      'PrimaryImagePath',
      'Name',
      'Commandline',
      'PrimaryImageMd5',
      'StartDateTime',
    ],
    'Registry Key': [
      'ProcessName',
      'ProcessPrimaryImagePath',
      'ValueName',
      'FilePath',
      'FileMd5',
      'IsPersistencePoint',
    ],
  };

  const [checkedExactMatching, setCheckedExactMatching] = React.useState(false);
  const [checkedCaseSensitive, setCheckedCaseSensitive] = React.useState(false);

  const [
    selectedArtifactFacetIndex,
    setSelectedArtifactFacetIndex,
  ] = React.useState(new IndexPath(0, 1));

  const [selectedZoneIndex, setSelectedZoneIndex] = React.useState(
    new IndexPath(0),
  );

  const renderOption = (title) => <SelectItem key={title} title={title} />;

  const renderGroup = (title) => (
    <SelectGroup title={title} key={title}>
      {ArtifactFacetsAvailable[title].map(renderOption)}
    </SelectGroup>
  );

  const zonesAvailable = props.zonesData;
  const displayValue = zonesAvailable[selectedZoneIndex.row].name;

  const artifactDisplayValue =
    Object.keys(ArtifactFacetsAvailable)[selectedArtifactFacetIndex.section] +
    ' -> ' +
    ArtifactFacetsAvailable[
      Object.keys(ArtifactFacetsAvailable)[selectedArtifactFacetIndex.section]
    ][selectedArtifactFacetIndex.row];

  let zones = props.zonesData.map((zone) => {
    return <SelectItem key={zone.id} title={zone.name} value={zone.name} />;
  });

  const [searchTermsText, setTextSearchTerms] = React.useState('');
  const [nameText, setTextName] = React.useState('');
  const [descriptionText, setTextDescription] = React.useState('');

  return (
    <Layout style={styles.container} level="1">
      <Card>
        {props.isCreateInstaQueryError &&
          Alert.alert('Failed to Created Query', props.createInstaQueryError, [
            {text: 'Okay', onPress: () => props.resetCreateQueryReducer()},
          ])}
        {props.isCreateInstaQuerySuccess &&
          Alert.alert('InstaQuery Created', props.createInstaQueryError, [
            {
              text: 'View Query',
              onPress: () => {
                props.resetCreateQueryReducer();
                props.resetInstaQueries();
                props.getInstaQueries();
                props.navigation.navigate('Queries');
              },
            },
          ])}
        <Text category="h1">Create Query</Text>
        <Text category="label">Search Term (s)</Text>
        <Input
          placeholder="Search for files, hashes, processes, registry value..."
          onChangeText={setTextSearchTerms}
          value={searchTermsText}
        />
        <Text category="label">
          {`Search Term (s) matching: ${
            checkedExactMatching ? 'Exact' : 'Fuzzy'
          }`}
        </Text>
        <Toggle
          style={styles.toggle}
          checked={checkedExactMatching}
          onChange={(nextChecked) => setCheckedExactMatching(nextChecked)}
        />
        <Text category="label">
          {`${checkedCaseSensitive ? 'Case Sensitive' : 'Not Case Sensitive'}`}
        </Text>
        <Toggle
          checked={checkedCaseSensitive}
          onChange={(nextChecked) => setCheckedCaseSensitive(nextChecked)}
          style={styles.toggle}
        />
        <Text category="label">Name</Text>
        <Input
          placeholder="Name this query."
          onChangeText={setTextName}
          value={nameText}
        />
        <Text category="label">Description</Text>
        <Input
          placeholder="Describe purpose of this query."
          onChangeText={setTextDescription}
          value={descriptionText}
        />
        <Divider />
        <Text category="label"> Artifact and Facet </Text>
        <Select
          placeholder="Default"
          value={artifactDisplayValue}
          selectedIndex={selectedArtifactFacetIndex}
          onSelect={(index) => setSelectedArtifactFacetIndex(index)}>
          {Object.keys(ArtifactFacetsAvailable).map(renderGroup)}
        </Select>
        <Divider />
        <Text category="label"> Zone </Text>
        <Select
          selectedIndex={selectedZoneIndex}
          value={displayValue}
          onSelect={(value) => setSelectedZoneIndex(value)}>
          {zones}
        </Select>
        {props.isCreateInstaQueryLoading ? (
          <Button
            style={styles.text}
            appearance="outline"
            accessoryLeft={LoadingIndicator}>
            LOADING
          </Button>
        ) : (
          <Button
            accessoryRight={SendQuery}
            style={styles.button}
            onPress={() => {
              props.createQuery(
                nameText,
                descriptionText,
                Object.keys(ArtifactFacetsAvailable)[
                  selectedArtifactFacetIndex.section
                ],
                ArtifactFacetsAvailable[
                  Object.keys(ArtifactFacetsAvailable)[
                    selectedArtifactFacetIndex.section
                  ]
                ][selectedArtifactFacetIndex.row],
                zonesAvailable[selectedZoneIndex.row].id,
                checkedExactMatching,
                checkedCaseSensitive,
                searchTermsText,
              );
            }}>
            Send InstaQuery
          </Button>
        )}
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
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

export default CreateQuery;
