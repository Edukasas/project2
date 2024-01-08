/* eslint-disable prettier/prettier */
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import { DynamicWidthBar } from '../../helpers/DynamicWidthBar';
import { getUsageStats } from '../../helpers/UsageStats';
import { fetchInstalledApps } from '../../helpers/FetchingApps';
import { calculateHoursAndMinutes } from '../../helpers/TimeUtils';
import { generateCategoryColors } from '../../helpers/ColorUtils';
import FastImage from 'react-native-fast-image';
import { useFocusEffect } from '@react-navigation/native';
import PieChart from 'react-native-pie-chart';
export default function DayStatistics(){
    const [currentDate, setCurrentDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState(null);
    const [stateToWatch, setStateToWatch] = useState(false);
    const [delayedRerender, setDelayedRerender] = useState(false);
  
    useEffect(() => {
      let timeoutId;
  
      // Set a timeout to trigger the delayed re-render after 1000 milliseconds (1 second)
      if (stateToWatch) {
        timeoutId = setTimeout(() => {
          setDelayedRerender(true);
        }, 500);
      }
  
      // Clear the timeout if the stateToWatch changes before the timeout is reached
      return () => clearTimeout(timeoutId);
  
    }, [stateToWatch]);
    const [endTime, setEndTime] = useState(() => {
      const thisDate = new Date();
      thisDate.setDate(thisDate.getDate() + 1);
      thisDate.setMinutes(0);
      thisDate.setHours(0);
      return thisDate.getTime();
    });
    const [startTime, setStartTime] = useState(() => {
      const thisDate = new Date();
      thisDate.setDate(thisDate.getDate() + 0);
      thisDate.setMinutes(0);
      thisDate.setHours(0);
      return thisDate.getTime();
    });
    useEffect(() => {
        setFormattedDate(`${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}`);
    }, [currentDate]);
 
    const updateDate = (offset) => {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + offset);
      setCurrentDate(newDate);
    
      const newEndTime = new Date(endTime);
      newEndTime.setDate(newEndTime.getDate() + offset);
      newEndTime.setMinutes(0);
      newEndTime.setHours(0);
      const updatedEndTime = newEndTime.getTime();
    
      const newStartTime = new Date(startTime);
      newStartTime.setDate(newStartTime.getDate() + offset);
      newStartTime.setMinutes(0);
      newStartTime.setHours(0);
      const updatedStartTime = newStartTime.getTime();
    
      setEndTime(updatedEndTime);
      setStartTime(updatedStartTime);
      setStateToWatch(!stateToWatch);
    };
    
    const handlePreviousDate = () => {
      updateDate(-1);
    };
    
    const handleNextDate = () => {
      updateDate(1);
    };
    

    [appUsages, setAppUsages] = useState(getUsageStats(startTime, endTime));
    const [allTime, setAllTime] = useState(0);
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

    const fetchData = () => {
      const newSeries = [];
      const updatedTime = installedApps.reduce((acc, app) => {
        const found = appUsages.find((a) => a.app === app.packageName);
        if (found) {
          newSeries.push(found.time);
          return acc + parseInt(found.time);
        }
        return acc;
      }, 0);
  
      const sortedSeries = [...newSeries].sort((a, b) => b - a);
      setSeries(sortedSeries);
      setAllTimeCalculated(true);
      setAllTime(updatedTime);
    };
  
    useEffect(() => {
      if (delayedRerender) {
        fetchData();
        console.log('Labas');
        setDelayedRerender(false);
      }
    }, [rerenderToggle, delayedRerender, installedApps]);

    const renderAllApps = () => {
      const renderApps = [];
      const appUsagesMap = new Map(appUsages.map((usage) => [usage.app, usage]));
    
      const sortedApps = installedApps.slice().sort((a, b) => {
        const timeA = (appUsagesMap.get(a.packageName) || {}).time || 0;
        const timeB = (appUsagesMap.get(b.packageName) || {}).time || 0;
        return timeB - timeA;
      });
    
      sortedApps.forEach((app, index) => {
        const usage = appUsagesMap.get(app.packageName);
        if (usage && parseInt(usage.time) > 0) {
          const time = parseInt(usage.time);
          const usedTime = calculateHoursAndMinutes(time);
          renderApps.push(
            <View key={`${index}`} style={styles.block}>
              <FastImage
                source={{ uri: `data:image/png;base64,${app.icon}` }}
                style={styles.img}
              />
              <Text style={styles.text}>{app.label}</Text>
              <View style={styles.numView2}>
                <Text style={styles.number2} />
              </View>
              <View style={styles.BarAndTime}>
                <DynamicWidthBar value={time} maxValue={14400} color={appColor[index]} />
                <Text style={styles.time}>{usedTime}</Text>
              </View>
            </View>
          );
        }
      });
    
      return renderApps;
    };
    const renderVisibleApps = showAllApps ? renderAllApps() : renderAllApps().slice(0, 3);
    const renderImg = btnImg ? require('../../../assets/images/up.png') : require('../../../assets/images/down.png');
    return (
      <ScrollView vertically={true} style={styles.OuterContainer}>
        <View style={styles.container}>
            <View style={styles.dateScreen}>
                <View style={styles.pressableWrapper}>
                    <Pressable onPress={handlePreviousDate}>
                    <FastImage source={require('../../../assets/images/arrowLeft.png')} style={styles.arrows}/>
                    </Pressable>
                </View>
                <Text style={styles.date}>{formattedDate}</Text>
                <View style={styles.pressableWrapper}>
                    <Pressable onPress={handleNextDate}>
                    <FastImage source={require('../../../assets/images/arrowRight.png')} style={styles.arrows}/>
                    </Pressable>
                </View>
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
              <FastImage source={renderImg} style={styles.buttonImg}/>
            </Pressable>
            : <></>}
        </View>
        </View>
      </ScrollView>
    );
};
const styles = StyleSheet.create({
  pressableWrapper: {
    padding: 10,
  },
    buttonImg: {
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 12,
    },
    button: {
      marginLeft: 17,
      marginRight: 17,
      borderTopWidth: 1,
      borderColor: '#3A3D44',
    },
    dateScreen: {
        marginLeft: 22,
        marginRight: 22,
        marginTop: 11,
        marginBottom: 17,
        justifyContent: 'space-between',
        alignContent: 'center',
        flexDirection: 'row',
    },
    arrows: {
        width: 18,
        height: 18,
    },
    date: {
      paddingTop: 10,
      paddingBottom: 10,
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
          alignItems: 'center',
          marginLeft: 17,
          marginRight: 17,
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