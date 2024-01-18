import { View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'; // Added missing imports
import { useEffect, useState} from 'react';
import Initialization from './components/Initialization';
import MainContainer from './components/MainContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [page, setPage] = useState('Initialization');
  const [loading, setLoading] = useState(true);

  const checkIsStarted = async () => {
    try {
      const started = await AsyncStorage.getItem('isStarted');
      if (started) {
        setPage('main');
      }
    } catch (e) {
      // Handle errors if necessary
    } finally {
      setLoading(false);
    }
  }

  const setIsStarted = async () => {
    try {
      await AsyncStorage.setItem('isStarted', '1');
    } catch (e) {
      console.log('error');
    }
  }

  useEffect(() => {
    checkIsStarted(); 
  }, []); 

  return (
    <KeyboardAvoidingView
    enabled={true}
    behavior={'height'}
    keyboardVerticalOffset={-100}
     style={styles.keyboard}
  >
      <View style={styles.container}>
        {loading ? (
          <View style={styles.customLoadingBg}>
        <Image
        source={require('./assets/images/ic_launcher.png')}
        style={styles.customLoadingImage}
      />
      </View>
        ) : page === 'Initialization' ? (
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
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  // Reikia ideti icon, kai loadina
  customLoadingBg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#354171',
  },
  customLoadingImage: {
    width: 100,
    height: 100,
  },
});

