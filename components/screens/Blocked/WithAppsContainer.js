/* eslint-disable prettier/prettier */
import React, { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InstalledApps } from 'react-native-launcher-kit';

export default function WithAppContainer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [installedApps, setInstalledApps] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load category from AsyncStorage
        const storedCategories = await AsyncStorage.getItem('categories');
        const parsedCategory = storedCategories ? JSON.parse(storedCategories) : [];
        console.log(storedCategories);
        setCategories(parsedCategory);
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
        const apps = InstalledApps.getApps();
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
  const renderCategoryBlocks = () => {
    if (categories === null) {
      return null;
    }
    return categories.map((category, index) => {
      const firstSelectedAppIndex = category?.selectedApps[0];
      const firstSelectedApp = installedApps[firstSelectedAppIndex];
      const appLength = category.selectedApps.length;
      const moreThanOneApp = appLength > 1;
      return (
        <View key={index} style={styles.block}>
          <Image
            source={{ uri: `data:image/png;base64,${firstSelectedApp?.icon}` }}
            style={styles.img}
          />
          <Text style={styles.text}>{category?.customCategoryName}</Text>
          { moreThanOneApp ? 
        <View style={styles.numView}>
        <Text style={styles.number}>{appLength}</Text>
        </View> :
        <View></View>
        }
        </View>
      );
    });
  };
  return (
    <View style={styles.Container}>
      {renderCategoryBlocks()}
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
    marginRight: 17,
  },
  numView: {
    flex: 1,
    alignItems: 'flex-end', 
  },
  number: {
    fontSize: 11,
    color: '#A7AABD',
    backgroundColor: '#010101',
    borderRadius: 8,
    paddingBottom: 2,
    paddingTop: 2,
    paddingRight: 6,
    paddingLeft: 6,
    marginTop: 16,
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
