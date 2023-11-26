/* eslint-disable prettier/prettier */
import React, { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InstalledApps } from 'react-native-launcher-kit';

export default function WithAppContainer() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Category, setCategory] = useState(null);
  const [installedApps, setInstalledApps] = useState([]);
  const firstSelectedAppIndex = Category?.selectedApps[0];
  const firstSelectedApp = installedApps[firstSelectedAppIndex];
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load category from AsyncStorage
        const storedCategory = await AsyncStorage.getItem('categoryState');
        const parsedCategory = storedCategory ? JSON.parse(storedCategory) : [];
        setCategory(parsedCategory);
      } catch (categoryError) {
        setError(categoryError.message || 'Error fetching category');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  useEffect(() => {
    const fetchInstalledApps = async () => {
      try {
        const apps = await InstalledApps.getApps();
        setInstalledApps(apps);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching installed apps:', error);
        setError(error.message || 'Error fetching apps');
        setLoading(false);
      }
    };

    // Fetch installed apps when the component mounts
    fetchInstalledApps();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.Container}>
      <View key={Category?.index} style={styles.block}>
       <Image
          source={{ uri: `data:image/png;base64,${firstSelectedApp?.icon}` }}
          style={styles.img}
        /> 
        <Text style={styles.text}>{Category?.customCategoryName}</Text>
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
    height: 50,
  },
  text: {
    marginTop: 16,
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'white',
  },
});
