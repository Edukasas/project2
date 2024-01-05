/* eslint-disable prettier/prettier */
import { StyleSheet, View, Text, Image, Pressable, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import { DynamicBar } from '../../helpers/DynamicBar';
import { DynamicWidthBar } from '../../helpers/DynamicWidthBar';
import { getUsageStats } from '../../helpers/UsageStats';
import { fetchInstalledApps } from '../../helpers/FetchingApps';
import { calculateHoursAndMinutes } from '../../helpers/TimeUtils';
import { generateCategoryColors } from '../../helpers/ColorUtils';
import { useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import PieChart from 'react-native-pie-chart';
export default function DayStatistics(){
    let [currentDate, setCurrentDate] = useState(new Date());
    let [formattedDate, setFormattedDate] = useState(null);

    //[appUsages, setAppUsages] = useState(getUsageStats(startTime, endTime));
    useEffect(() => {
        setFormattedDate(`${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}`);
    }, [currentDate]);
 
    const handlePreviousDate = () =>{
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 1);
        setCurrentDate(newDate);
    };
    const handleNextDate = () =>{
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 1);
        setCurrentDate(newDate);
    };
    // useEffect(() => {
    //   const updateStatistics = () => {
    //     const startTime = new Date(currentDate);
    //     startTime.setMinutes(0);
    //     startTime.setHours(0);
    //     const endTime = new Date(currentDate);
    //     endTime.setDate(currentDate.getDate() + 1);
    //     endTime.setMinutes(0);
    //     endTime.setHours(0);
    //   };
  
    //   // Initial data load
    //   updateStatistics();
    // }, [currentDate]);
    // const [endTime, setEndTime] = useState(null);
    // const [startTime, setStartTime] = useState(null);
    let endTime = (new Date());
    endTime.setMinutes(0);
    endTime.setHours(0);
    endTime = endTime.getTime();
    let startTime = (new Date());
    startTime.setDate(startTime.getDate() - 1);
    startTime.setMinutes(0);
    startTime.setHours(0);
    startTime = startTime.getTime();
    [appUsages, setAppUsages] = useState(getUsageStats(startTime, endTime));
    let [allTime, setAllTime] = useState(0);
    const [rerenderToggle, setRerenderToggle] = useState(false);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [installedApps, setInstalledApps] = useState([]);
    const [allTimeCalculated, setAllTimeCalculated] = useState(false);
    const widthAndHeight = 160;
    const appColor = useMemo(() => generateCategoryColors(series.length), [series]);
    const [showAllApps, setShowAllApps] = useState(false);
    const [btnImg, setBtnImg] = useState(false);
    const toggleAppsVisibility = () => {
      setShowAllApps(!showAllApps);
      setBtnImg(!btnImg);
    };

    useFocusEffect(
      React.useCallback(() => {
        console.log('Screen is focused. Rerendering...'); // Add this line for debugging
        setRerenderToggle((prev) => !prev);
      }, [])
    );
    
    useEffect(() => {
      fetchInstalledApps(setInstalledApps, setLoading, setError);
    }, []);
    useEffect(() => {
      const newSeries = [];
      let updatedTime = 0;
      installedApps.forEach((app) => {
        let time = 0;
        const found = appUsages.find((a) => a.app === app.packageName);
        if (found) {
          newSeries.push(found.time);
          time += parseInt(found.time);
        }
        updatedTime += time;
      });
      const orderedSeries = [...newSeries].sort((a, b) => b - a);

      setSeries(orderedSeries);
      setAllTimeCalculated(true);
      setAllTime(updatedTime);
    }, [rerenderToggle, allTimeCalculated, installedApps]);

    const renderAllApps = () => {
      const renderApps = [];
      const sortedApps = [...installedApps].sort((a, b) => {
        // Assuming that appUsages contains the screen time information for each app
        const timeA = appUsages.find((usage) => usage.app === a.packageName)?.time || 0;
        const timeB = appUsages.find((usage) => usage.app === b.packageName)?.time || 0;
      
        // Sort by screen time in descending order
        return timeB - timeA;
      });
      let i = 0;
      sortedApps.forEach((app, index) => {
        let time = 0;
        const found = appUsages.find((a) => a.app === app.packageName);
    
        if (found) {
          time = parseInt(found.time);
        }
        if (time > 0){
        const usedTime = calculateHoursAndMinutes(time);
        renderApps.push({
          appBlock: (
            <View key={`${index}`} style={styles.block}>
              <Image
                source={{ uri: `data:image/png;base64,${app.icon}` }}
                style={styles.img}
              />
              <Text style={styles.text}>{app.label}</Text>
              <View style={styles.numView2}>
                <Text style={styles.number2} />
              </View>
              <View style={styles.BarAndTime}>
              <DynamicWidthBar value={time} maxValue={14400} color={appColor[i]} />
                <Text style={styles.time}>{usedTime}</Text>
              </View>
            </View>
          ),
          time: time,
        });
        i++;
      }
      });
      // Sort renderApps array based on screen time in descending order
      renderApps.sort((a, b) => b.time - a.time);

      return renderApps.map((app) => app.appBlock);
    };
    const renderVisibleApps = showAllApps ? renderAllApps() : renderAllApps().slice(0, 3);
    const renderImg = btnImg ? require('../../../assets/images/up.png') : require('../../../assets/images/down.png');
    return (
      <ScrollView vertically={true} style={styles.OuterContainer}>
        <View style={styles.container}>
            <View style={styles.dateScreen}>
                <Pressable onPress={handlePreviousDate}>
                <Image source={require('../../../assets/images/arrowLeft.png')} style={styles.arrows}/>
                </Pressable>
                <Text style={styles.date}>{formattedDate}</Text>
                <Pressable onPress={handleNextDate}>
                <Image source={require('../../../assets/images/arrowRight.png')} style={styles.arrows}/>
                </Pressable>
            </View>
            <View style={styles.Blocks}>
          <View style={styles.topPart}>
            <Text style={styles.BlockName}>Screen Time</Text>
            <Text style={styles.allTime}>{calculateHoursAndMinutes(allTime)}</Text>
          </View>
          {appColor.length === series.length && series.length > 0 && series.reduce((acc, val) => acc + val, 0) > 0 ? (
        <PieChart
          style={styles.PieChart}
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={appColor}
          coverRadius={0.80}
          coverFill={'#191C25'}
        />
      ) : (
        <View/>
      )}
          {renderVisibleApps}
          {series.length > 3 ?
          <Pressable onPress={toggleAppsVisibility} style={styles.button}>
              <Image source={renderImg} style={styles.buttonImg}/>
            </Pressable>
            : <></>}
        </View>
        </View>
      </ScrollView>
    );
};
const styles = StyleSheet.create({
    buttonImg: {
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 12,
    },
    button: {
      marginLeft: 20,
      marginRight: 20,
      borderTopWidth: 1,
      borderColor: '#3A3D44',
    },
    dateScreen: {
        marginLeft: 32,
        marginRight: 32,
        marginTop: 21,
        marginBottom: 27,
        justifyContent: 'space-between',
        alignContent: 'center',
        flexDirection: 'row',
    },
    arrows: {
        width: 18,
        height: 18,
    },
    date: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Roboto',
    },
    Blocks: {
        borderRadius: 17,
        backgroundColor: '#191C25',
      },
      topPart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        lineHeight: 21,
        marginTop: 18,
        marginLeft: 25,
        marginRight: 25,
      },
      allTime: {
        color: 'white',
      },
        BlockName: {
          fontFamily: 'Roboto-Regular',
          fontWeight: '700',
          fontSize: 18,
          marginBottom: 11,
          color: 'white',
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
          fontSize: 13,
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
        DynamicBar: {
            width: 150,
            alignSelf: 'flex-end',
          },
          PieChart: {
            alignSelf: 'center',
         },
});