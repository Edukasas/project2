/* eslint-disable prettier/prettier */
import { useCategoryContext } from '../CategoryContext';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useState } from 'react';
import AddCategory from './Blocked/AddCategory';
import EmptyAppContainer from './Blocked/EmptyAppsContainer';
import WithAppContainer from './Blocked/WithAppsContainer';
export default function BlockedAppListScreen() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showWithApps, setShowWithApps] = useState(false);
  const handleCreateAppLimitPress = () => {
    setShowAddCategory(true);
  };
  const renderingCorrectPage = () => {
    if(1)setShowWithApps(true);
    setShowAddCategory(false);
    console.log(useCategoryContext);
  }
  const getPressableText = () => {
    return showWithApps ? 'Add more' : 'Create App Limit';
  };
    return (
        <View style={styles.Container}>
 {showAddCategory ? (
        <AddCategory refresh={renderingCorrectPage}/>
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
