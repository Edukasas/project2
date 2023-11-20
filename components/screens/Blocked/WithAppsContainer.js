/* eslint-disable prettier/prettier */
import  React, {View, Text, StyleSheet, Image} from 'react-native';
import { useEffect, useState} from 'react';
import { useCategoryContext  } from '../../CategoryContext';
import { InstalledApps } from 'react-native-launcher-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WithAppContainer() {
  const { state } = useCategoryContext();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadApps = async () => {
      try {
        // Load apps from AsyncStorage
        const storedApps = await AsyncStorage.getItem('storedApps');
        const appList = storedApps ? JSON.parse(storedApps) : await InstalledApps.getApps();
        setApps(appList);
      } catch (error) {
        setError(error.message || 'Error fetching apps');
      } finally {
        setLoading(false);
      }
    };

    loadApps();
  }, []);
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  console.log("AppsContainer", setApps.length);
    return (
      <View style={styles.Container}>
        <View key={state.index} style={styles.block}>
            <Image
              source={{ uri: 'data:image/png;base64,' + apps[0].icon }}
              style={styles.img}
            />
            <Text style={styles.text}>{state.customCategoryName}</Text>
        </View>

    </View>
    );
  }
  const styles = StyleSheet.create({
    Container: {
      backgroundColor: '#191C25',
      marginTop: 10,
    },
    block: {
      flexDirection: 'row',
      gap: 18,
    },
    img: {
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 10,
      marginRight: 10,
      width: 50,
      height: 50
    },
    text: {
      marginTop: 16,
      fontFamily: 'Roboto',
      fontSize: 16,
      color: 'white',
    }
   
  });
