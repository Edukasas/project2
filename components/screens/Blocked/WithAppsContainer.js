/* eslint-disable prettier/prettier */
import React, { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, NativeModules   } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InstalledApps } from 'react-native-launcher-kit';

function getUsageStats(startTime, endTime) {
  const {UsageStatsModule} = NativeModules;
  [appUsages, setAppUsages] = useState([]);
  UsageStatsModule.getStats(startTime, endTime, stats => {
    const appUsage = [];
    let apps = stats.split(',');
    apps.map(app => {
      let appStats = app.split(':');
      if (appStats[1] > 0) {
        appUsage.push({
          app: appStats[0],
          time: Number(appStats[1])/1000
        })
      }
    })
    setAppUsages(appUsage)
  })

  return appUsages;
}

export default function WithAppContainer({setIsStoredDataAvailable, edit}) {


  // let endTime = (new Date()).getTime();
  // let startTime = (new Date());
  // startTime.setMinutes(0);
  // startTime.setHours(0);
  // startTime = startTime.getTime();
  // UsageStatsModule.getStats(startTime, endTime, stats => {
  //   const appUsage = [];
  //   let apps = stats.split(',');
  //   apps.map(app => {
  //     let appStats = app.split(':');
  //     if (appStats[1] > 0) {
  //       appUsage.push({
  //         app: appStats[0],
  //         time: appStats[1]
  //       })
  //     }
  //   })
  //   setAppUsages(appUsage)
  // })

  let endTime = (new Date()).getTime();
  let startTime = (new Date());
  startTime.setMinutes(0);
  startTime.setHours(0);
  startTime = startTime.getTime();
  [appUsages, setAppUsages] = useState(getUsageStats(startTime, endTime));
  const series = appUsages.map(val => val.time);
  console.log(series)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [installedApps, setInstalledApps] = useState([]);

  const handleEditCategory = (category) => {
    if (typeof edit === 'function') {
      edit(category);
    } else {
      console.error('Edit prop is not a function.');
    }
  };
  
  const handleDeleteCategory = async (category) => {
    try {
      // Remove the category from the state
      const updatedCategories = categories.filter((cat) => cat !== category);
      setCategories(updatedCategories);
  
      // Save the updated categories to AsyncStorage
      await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));

      setIsStoredDataAvailable(updatedCategories.length > 0);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
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

      const firstSelectedAppPackage = category?.selectedApps[0];
      let time = 0;
      category?.selectedApps.map(app => {
        let found = appUsages.filter(a => a.app === app);
        if (found && found.length > 0) {
          time += parseInt(found[0].time);
        }
      })
      const firstSelectedApp = installedApps.find(value => value.packageName === firstSelectedAppPackage);
      const isSelected = selectedCategory === category;
      const appLength = category.selectedApps.length;
      const moreThanOneApp = appLength > 1;
      
      const selectedBorderStyle = isSelected ? styles.selectedBorder : {};

      return (
        <View key={index} style={styles.block} >
           <TouchableOpacity
           style={styles.topBlock}
          onPress={() => setSelectedCategory(isSelected ? null : category)}
        >
          <Image
            source={{ uri: `data:image/png;base64,${firstSelectedApp?.icon}` }}
            style={styles.img}
          />
          <View style={[styles.border, index === categories.length - 1 && styles.lastBorder, selectedBorderStyle]}>
          <Text style={styles.text}>{category?.customCategoryName}</Text>
          <Text>Time: {time} sec</Text>
          { moreThanOneApp ? 
        <View style={styles.numView}>
        <Text style={styles.number}>{appLength}</Text>
        </View> :
        <View></View>
        }</View>
        </TouchableOpacity>
         {isSelected && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => handleEditCategory(category)}
              style={styles.biggerBlock}
            >
              <Image source={require('../../../assets/images/pen.png')}/>
              <Text style={styles.Buttons}>Edit</Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TouchableOpacity
              onPress={() => handleDeleteCategory(category)}
              style={styles.biggerBlock}
            >
              <Image source={require('../../../assets/images/trashbin.png')}/>
              <Text style={styles.Buttons}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        </View>
      );
    });
  };
  return (
    <ScrollView style={styles.scrollViewContainer}>
    {renderCategoryBlocks()}
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  selectedBorder: {
    borderBottomWidth: 0,
  },
  verticalLine: {
    height: '80%', // Adjust the height as needed
    width: 1,
    backgroundColor: '#3A3D44', // Change the color as needed
    marginHorizontal: 10, // Adjust the margin as needed
  },
  border: {
    borderBottomWidth: 1,
    borderColor: '#3A3D44',
    flex: 1,
    flexDirection: 'row',
  },
  scrollViewContainer: {
    maxHeight: 600,
    borderRadius: 17,
    marginTop: 10,
    backgroundColor: '#191C25',
  },
  Container: {
    backgroundColor: '#191C25',
    marginTop: 10,
    borderRadius: 17,
  },
  lastBorder: {
    borderBottomWidth: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  biggerBlock: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10,
  },
  Buttons: {
    color:'#BBC4EC',
    fontSize: 14,
  },
  topBlock: {
    flexDirection: 'row',
    gap: 18,
  },
  block: {
    marginRight: 22,
  },
  numView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start', 
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
