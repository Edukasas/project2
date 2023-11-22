/* eslint-disable prettier/prettier */
import  React, {View, Text, StyleSheet, Image} from 'react-native';
import { useEffect, useState} from 'react';
import { useCategoryContext  } from '../../CategoryContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InstalledApps } from 'react-native-launcher-kit';

export default function WithAppContainer() {
  const { state } = useCategoryContext();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Category, setCategory] = useState(null);
  useEffect(() => {
    const loadApps = async () => {
        const appList = await InstalledApps.getApps();
        setApps(appList);
    };
    loadApps();
  }, []);
  console.log(apps.map(app => app.index));
  useEffect(() => {
    const loadApps = async () => {
      try {
        // Load apps from AsyncStorage
        const Category = await AsyncStorage.getItem('categoryState');
        const CategoryArray  = Category ? JSON.parse(Category) : [];
        setCategory(CategoryArray);
     } catch (error) {
        setError(error.message || 'Error fetching apps');
      } finally {
        setLoading(false);
      }
    };

    loadApps();
  }, []);
  const selectedAppIndex = Category.selectedApps[0];
  console.log("Selected App Index:", selectedAppIndex);
  //const selectedApp = apps.find(app => app.index === selectedAppIndex);

  // if (selectedApp) {
  //   const icon = selectedApp.icon;
  //   console.log("Icon:", icon);
  // } else{
  //   console.log("App not found");
  // }
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
             // source={{ uri: 'data:image/png;base64,' + app[selectedApp[0]].icon }}
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
