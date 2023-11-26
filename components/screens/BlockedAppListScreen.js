/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useState, useEffect } from 'react';
import AddCategory from './Blocked/AddCategory';
import EmptyAppContainer from './Blocked/EmptyAppsContainer';
import WithAppContainer from './Blocked/WithAppsContainer';
export default function BlockedAppListScreen() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [isStoredDataAvailable, setIsStoredDataAvailable] = useState(false);

 
  useEffect(() => {
    const checkStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('categoryState');
        setIsStoredDataAvailable(!!storedData);
      } catch (error) {
        console.error('Error checking stored data:', error);
      }
    };

    checkStoredData();
  }, []);

    const handleCreateAppLimitPress = () => {
      setShowAddCategory(true);
    };
    const handleCancel = () => {
      setShowAddCategory(false);
    };
    const handleUpdate = () => {
      setIsStoredDataAvailable(true);
      setShowAddCategory(false);
    }
    const getPressableText = () => {
      return isStoredDataAvailable ? 'Add more' : 'Create App Limit';
    };
      return (
          <View style={styles.Container}>
  {showAddCategory ? (
          <AddCategory update={handleUpdate} onCancel={handleCancel}/>
      ) : (
        <View>
          {isStoredDataAvailable ? (
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
