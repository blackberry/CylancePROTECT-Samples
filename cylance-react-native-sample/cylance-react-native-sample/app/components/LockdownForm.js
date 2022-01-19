import React from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import {
  Layout,
  IndexPath,
  Select,
  SelectItem,
  Text,
  Card,
  Button,
  Spinner
} from '@ui-kitten/components';

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

const LockdownForm = ({deviceId, props}) => {
  const [daysIndex, setDaysIndex] = React.useState(new IndexPath(0));
  const [hoursIndex, setHoursIndex] = React.useState(new IndexPath(0));
  const [minutesIndex, setMinutesIndex] = React.useState(new IndexPath(0));

  const days = daysIndex.row.toString();
  const hours = hoursIndex.row.toString();
  const minutes = minutesIndex.row.toString();

  // creates a string array where the values are consecutive numbers starting from 0 to limit-1
  const populatePicker = (limit) => {
    return Array(limit).fill().map((_, index) => <SelectItem key={index.toString()} title={index.toString()}/>);
  }

  const handleQuarantineButton = () => {
    let hoursVal = hours;
    let minutesVal = minutes;

    if (hoursVal.length === 1) {
      hoursVal = "0" + hoursVal;
    }

    if (minutesVal.length === 1) {
      minutesVal = "0" + minutesVal;
    }
    props.lockdownDevice(deviceId, days, hoursVal, minutesVal);
  }

  return (
    <Layout style={styles.container} level="1">
      {props.isError && 
        Alert.alert('Device Lockdown Failed', props.error, [
          {
            text: 'Go Home',
            onPress: () => {
              props.navigation.navigate('Home');
              props.resetLockdownReducer();
            },
          },
          {
            text: "OK",
            onPress: () => {
              props.resetLockdownReducer();
            },
            style: "cancel"
          }
        ])
      }

      {props.success && 
        Alert.alert('Device Locked Down', `${deviceId} successfully locked down.`, [
          {
            text: 'OK',
            onPress: () => {
              props.navigation.navigate('Home');
              props.resetLockdownReducer();
            },
          }
        ])
      }

      <Text style={styles.texts}>{`Device ID: ${deviceId}`}</Text>

      <Card style={styles.container}>
        <Text category="label">Days</Text>
        <Select
          style={styles.select}
          size='small'
          placeholder='Default'
          value={days.toString()}
          selectedIndex={daysIndex}
          onSelect={index => setDaysIndex(index)}
        >
          {populatePicker(4)}
        </Select>
      </Card>

      <Card style={styles.container}>
        <Text category="label">Hours</Text>
        <Select
          style={styles.select}
          size='small'
          placeholder='Default'
          value={hours.toString()}
          selectedIndex={hoursIndex}
          onSelect={index => setHoursIndex(index)}
        >
          {populatePicker(24)}
        </Select>
      </Card>


      <Card style={styles.container}>
        <Text category="label">Minutes</Text>
        <Select
          style={styles.select}
          size='small'
          placeholder='Default'
          value={minutes.toString()}
          selectedIndex={minutesIndex}
          onSelect={index => setMinutesIndex(index)}
        >
          {populatePicker(60)}
        </Select>
      </Card>

      {props.loading ? (
        <Button
          style={styles.text}
          appearance="outline"
          accessoryLeft={LoadingIndicator}>
          LOADING
        </Button>
      ) : (
        <Button
          onPress={handleQuarantineButton}
          appearance="outline">
            Quarantine Device
        </Button>
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 80
  },
  layout: {
    flex: 1,
  },
  text: {
    margin: 10,
    fontSize: 20,
  },
  select: {
    flex: 1,
    margin: 2,
  },
  button: {
    margin: 10,
    fontSize: 20,
    backgroundColor: '#69d03c',
  }
})

export default LockdownForm;

