// Storage.js
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = (key, initialState) => {
  // Load state from AsyncStorage on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        const storedState = await AsyncStorage.getItem(key);
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          console.log(parsedState);
          // Update the state with the loaded data
          setState(parsedState);
        }
      } catch (error) {
        console.error(`Error loading state for key ${key} from AsyncStorage:`, error);
      }
    };

    loadState();
  }, [key]);

  // State to hold the data
  const [state, setState] = useState(initialState);

  // Save state to AsyncStorage whenever it changes
  const saveState = useCallback(async () => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(state));
      const savedData = await AsyncStorage.getItem(key);
      console.log(`Read data for key ${key}:`, savedData);
    } catch (error) {
      console.error(`Error saving state for key ${key} to AsyncStorage:`, error);
    }
  }, [key, state]);

  // Update the saved state whenever the state changes
  useEffect(() => {
    saveState();
  }, [state, saveState]);

  return [state, setState];
};
