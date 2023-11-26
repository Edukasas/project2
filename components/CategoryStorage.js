// CategoryContext.js
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CategoryStorage = () => {
  useEffect(() => {
    const loadState = async () => {
      try {
        const storedState = await AsyncStorage.getItem('categoryState');
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          console.log(parsedState);
        }
      } catch (error) {
        console.error('Error loading state from AsyncStorage:', error);
      }
    };

    loadState();
  }, []);

  // Save state to AsyncStorage whenever it changes
  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem('categoryState', JSON.stringify(state));
        const savedData = await AsyncStorage.getItem('categoryState');
        console.log('Read data:', savedData);
      } catch (error) {
        console.error('Error saving state to AsyncStorage:', error);
      }
    };

    saveState();
  }, [state]);
}
