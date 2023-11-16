/* eslint-disable prettier/prettier */
import StartBlocked from './Blocked/StartBlocked';
import MainBlocked from './Blocked/MainBlocked';
import Time from './Blocked/time';
import { useCategoryContext } from './Blocked/CategoryContext';
import { View, StyleSheet } from 'react-native';


export default function BlockedAppScreen({navigation}) {
    const { state } = useCategoryContext();
    navigation.setOptions({
        headerStyle: {
            height: 70,
        },
        headerTitleStyle: {
            fontSize: 22,
            fontFamily: 'Roboto-Bold', // Set your desired font family
          },
    });
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
