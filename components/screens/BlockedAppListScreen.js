/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Pressable, Text, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import AddCategory from './Blocked/AddCategory';
import EmptyAppContainer from './Blocked/EmptyAppsContainer';
import WithAppContainer from './Blocked/WithAppsContainer';
export default function BlockedAppListScreen() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [isStoredDataAvailable, setIsStoredDataAvailable] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
 
  useEffect(() => {
    const checkStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('categories');
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
    useEffect(() => {
      // Fade in when isStoredDataAvailable becomes true
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500, // Adjust the duration as needed
        useNativeDriver: false, // Add this line if you are not using RN 0.63+
      }).start();
    }, [isStoredDataAvailable, fadeAnim]);
      return (
          <View style={styles.Container}>
  {showAddCategory ? (
          <AddCategory update={handleUpdate} onCancel={handleCancel}/>
      ) : (
        <Animated.View style={{ opacity: fadeAnim }}>
        <View>
          {isStoredDataAvailable ? (
            <WithAppContainer setIsStoredDataAvailable={setIsStoredDataAvailable} edit={handleCreateAppLimitPress}/>
          ) : (
          <EmptyAppContainer/>
          )}
        <Pressable
          onPress={handleCreateAppLimitPress}
          style={styles.button}>
          <Text style={styles.buttonText}>{getPressableText()}</Text>
        </Pressable>
        </View>
        </Animated.View>
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
