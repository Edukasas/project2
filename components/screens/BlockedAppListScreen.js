/* eslint-disable prettier/prettier */
import StartBlocked from './Blocked/EmptyAppsContainer';
import MainBlocked from './Blocked/WithAppsContainer';
import Time from './Blocked/FormComponents/TimeForm';
import { useCategoryContext } from '../CategoryContext';
import { View, StyleSheet } from 'react-native';


export default function BlockedAppScreen() {
    const { state } = useCategoryContext();
    console.log('state.selectedApps:', state.selectedApps);
    return (
        <View style={styles.Container}>
          <StartBlocked />
         {/* {state.selectedApps.length > 0 ? (
        <MainBlocked />
      ) : (
        <StartBlocked />
      )} */}
      {/* <Time /> */}
          </View>
    );
}
const styles = StyleSheet.create({
        Container: {
            backgroundColor: 'black',
            flex: 1,
        },
});
