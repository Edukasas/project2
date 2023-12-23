/* eslint-disable prettier/prettier */
import {StyleSheet, Image, Text, View} from 'react-native';
import { useEffect, useState } from 'react';
import { DynamicBar } from '../helpers/DynamicBar';
import { getUsageStats } from '../helpers/UsageStats';
import { fetchInstalledApps } from '../helpers/FetchingApps';
import { loadCategories } from '../helpers/LoadDataFromStorage';
import { calculateHoursAndMinutes } from '../helpers/TimeUtils';
import { useFocusEffect } from '@react-navigation/native';

import React  from 'react';
export default function HomeScreen({navigation}) {
     navigation.setOptions({
    headerTitle: () => (
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
    ),
  });
  let endTime = (new Date()).getTime();
  let startTime = (new Date());
  startTime.setMinutes(0);
  startTime.setHours(0);
  startTime = startTime.getTime();
  [appUsages, setAppUsages] = useState(getUsageStats(startTime, endTime));
  const series = appUsages.map(val => val.time);
  const [rerenderToggle, setRerenderToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [installedApps, setInstalledApps] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('Screen is focused. Rerendering...'); // Add this line for debugging
      setRerenderToggle((prev) => !prev);
    }, [])
  );

  useEffect(() => {
    console.log(rerenderToggle);
    const loadData = async () => {
      await loadCategories(setCategories, setLoading, setError);
    };
    loadData();
  }, [rerenderToggle]);
  useEffect(() => {
    fetchInstalledApps(setInstalledApps, setLoading, setError);
  }, []);
  const renderCategoryBlocks = () => {
    if (categories === null) {
      return null;
    }
    return categories.map((category, index) => {
      const firstSelectedAppPackage = category?.selectedApps[0];
      let time = 0;
      let usageTime = category.usageTime;
      category?.selectedApps.map(app => {
        let found = appUsages.filter(a => a.app === app);
        if (found && found.length > 0) {
          time += parseInt(found[0].time);
        }
      })
      const firstSelectedApp = installedApps.find(value => value.packageName === firstSelectedAppPackage);
      const appLength = category.selectedApps.length;
      const moreThanOneApp = appLength > 1;
      const usedTime = calculateHoursAndMinutes(time);
      const leftTime = calculateHoursAndMinutes(usageTime);
      return (
        <View key={index} style={styles.block} >
          <Image
            source={{ uri: `data:image/png;base64,${firstSelectedApp?.icon}` }}
            style={styles.img}
          />
          <Text style={styles.text}>{category?.customCategoryName}</Text>
              { moreThanOneApp ?
            <View style={styles.numView}>
              <Text style={styles.number}>{appLength}</Text>
            </View> :
            <View style={styles.numView2}>
            <Text style={styles.number2}>{appLength}</Text>
          </View>
            }
            <View styles={styles.BarAndTime}>
                <DynamicBar segment1={time} segment2={usageTime-time} style={styles.innerMidContainer} height={9}/>
                 <View style={styles.innerBottomContainer}>
                <Text style={styles.time}>{usedTime} / {leftTime}</Text>
                </View> 
               </View>
        </View>
      );
  });
};
    return (
        
            <View style={styles.Container}>
                <View style={styles.topBlock}>

                </View>
                <View style={styles.bottomBlock}>
                  <Text style={styles.bottomBlockName}>App timers</Text>
                {renderCategoryBlocks()}
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    Header: {
        backgroundColor: '#354171',
    },
    innerMidContainer: {
      width: 160,
      alignSelf: 'flex-end',
    },
    logo: {
      width: 112,
      height: 48,
      marginTop: 10,
      marginLeft: 10,
      marginBottom: 11,
  },
  Container: {
    backgroundColor: 'black',
    flex: 1,
    gap: 20,
},
  topBlock: {
    borderRadius: 17,
    backgroundColor: '#191C25',
    height: 370,
  },
    bottomBlock: {
      borderRadius: 17,
      backgroundColor: '#191C25',
    },
    bottomBlockName: {
      fontFamily: 'Roboto-Regular',
      fontWeight: '700',
      fontSize: 18,
      lineHeight: 21,
      color: 'white',
      marginTop: 18,
      marginLeft: 25,
      marginBottom: 11,
    },
    block: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 22,
      marginRight: 25,
      marginTop: 21,
      gap: 13,
      marginBottom: 15,
    },
    img: {
      width: 30,
      height: 30,
    },
    text: {
      fontWeight: '500',
      fontFamily: 'Roboto',
      fontSize: 14,
      color: 'white',
    },
    numView: {
      flex: 1,
      alignItems: 'flex-end',
    },
    number: {
      fontSize: 11,
      color: '#DDE1FF',
      backgroundColor: '#354171',
      borderRadius: 8,
      paddingBottom: 2,
      paddingTop: 2,
      paddingRight: 6,
      paddingLeft: 6,
    },
    numView2: {
      flex: 1,
      alignItems: 'flex-end',
    },
    number2: {
      fontSize: 11,
      color: '#191C25',
      backgroundColor: '#191C25',
      borderRadius: 8,
      paddingBottom: 2,
      paddingTop: 2,
      paddingRight: 6,
      paddingLeft: 6,
    },
    time: {
      textAlign: 'right',
      color: '#99999B',
      fontSize: 10,
    },
    BarAndTime: {
      alignItems: 'flex-end',
    },
});