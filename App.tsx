import { View, StyleSheet} from 'react-native'; // Added missing imports
import { useEffect, useState} from 'react';
import Initialization from './components/Initialization';
import MainContainer from './components/MainContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CategoryProvider } from './components/CategoryContext';

export default function App() {
  const [page, setPage] = useState('Initialization');

  const checkIsStarted = async () => {
    try {
      const started = await AsyncStorage.getItem('isStarted');
      if (started) {
        setPage('main');
      }
    } catch (e) {
      // Handle errors if necessary
    }
  }

  const setIsStarted = async () => {
    try {
      await AsyncStorage.setItem('isStarted', '1');
    } catch (e) {
      // Handle errors if necessary
    }
  }

  useEffect(() => {
    checkIsStarted(); // Check if 'isStarted' exists when the component mounts
  }, []); // The empty dependency array ensures this effect runs once

  return (
    <CategoryProvider>
      <View style={styles.container}>
        {page === 'Initialization' ? (
          <Initialization
            onPress={() => {
              setIsStarted();
              setPage('main');
            }}
          />
        ) : (
          <MainContainer />
        )}
      </View>
    </CategoryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
