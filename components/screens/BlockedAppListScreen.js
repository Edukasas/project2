/* eslint-disable prettier/prettier */
import { useCategoryContext } from '../CategoryContext';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useState, useEffect } from 'react';
import AddCategory from './Blocked/AddCategory';
import EmptyAppContainer from './Blocked/EmptyAppsContainer';
import WithAppContainer from './Blocked/WithAppsContainer';
export default function BlockedAppListScreen() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showWithApps, setShowWithApps] = useState(false);
  const { state } = useCategoryContext();
  const isAppsSelected = state.selectedApps.length > 0;
  console.log("Blocked App List screen", isAppsSelected);
  const handleCreateAppLimitPress = () => {
    setShowAddCategory(true);
  };
  useEffect(() => {
    setShowWithApps(isAppsSelected);
  }, [isAppsSelected]);
  const getPressableText = () => {
    return showWithApps ? 'Add more' : 'Create App Limit';
  };
    return (
        <View style={styles.Container}>
 {showAddCategory ? (
        <AddCategory refresh={() => setShowWithApps(isAppsSelected)}/>
      ) : (
        <View>
          {showWithApps ? (
            <WithAppContainer/>
          ) : (
          <EmptyAppContainer/>
          )}
        <Pressable
          onPress={handleCreateAppLimitPress}
          style={styles.button}>
          <Text style={styles.buttonText}>{getPressableText()}</Text>
        </Pressable>
        </View>
      )}
          </View>
    );
}
const styles = StyleSheet.create({
        Container: {
            backgroundColor: 'black',
            flex: 1,
        },
        button: {
          backgroundColor: '#14151A',
          borderRadius: 17,
          alignSelf: 'center',
          marginTop: 24,
      },
      buttonText: {
          color: '#BBC4EC',
          fontFamily: 'Roboto-Bold',
          alignSelf: 'center',
          marginTop: 9,
          marginBottom: 9,
          marginLeft: 29,
          marginRight: 29,
      },
});
