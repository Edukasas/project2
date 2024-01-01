/* eslint-disable prettier/prettier */
import { StyleSheet, View, Text, Image, Pressable, ScrollView, Dimensions } from "react-native";
import {useState, useEffect} from 'react';
import { DynamicBar } from '../../helpers/DynamicBar';
import { getUsageStats } from '../../helpers/UsageStats';
import { fetchInstalledApps } from '../../helpers/FetchingApps';
import { loadCategories } from '../../helpers/LoadDataFromStorage';
import { calculateHoursAndMinutes } from '../../helpers/TimeUtils';
import { generateCategoryColors } from '../../helpers/ColorUtils';
import { useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { BarChart } from "react-native-gifted-charts";
import React from "react";
export default function WeekStatistics(){
    let [currentDate, setCurrentDate] = useState(new Date());
    let [formattedDate, setFormattedDate] = useState(null);

    useEffect(() => {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the week (Sunday)
    
        const endOfWeek = new Date(currentDate);
        endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay())); // End of the week (Saturday)
    
        const startMonth = startOfWeek.toLocaleString('default', { month: 'long' });
        const endMonth = endOfWeek.toLocaleString('default', { month: 'long' });
    
        const formattedStartDate = `${startMonth} ${startOfWeek.getDate()}`;
        const formattedEndDate = `${endMonth} ${endOfWeek.getDate()}`;
    
        setFormattedDate(`${formattedStartDate} - ${formattedEndDate}`);
    }, [currentDate]);
 
    const handlePreviousDate = () =>{
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };
    const handleNextDate = () =>{
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    };
    const barData = [
        {value: 250, label: 'S'},
        {value: 500, label: 'M'},
        {value: 745, label: 'T'},
        {value: 320, label: 'W'},
        {value: 600, label: 'T'},
        {value: 256, label: 'F'},
        {value: 300, label: 'S'},
    ];
    const yAxisLabelFormatter = (value) => {
        // Check if the value starts with '0'
        if (value.startsWith('0')) {
          // Remove the first character ('0')
          return value.substring(1);
        }
        // Return the original value if it doesn't start with '0'
        return value;
      };
    const textStyle = {
        color: '#FFF',
        fontSize: 12,
    };
    let endTime = (new Date()).getTime();
    let startTime = (new Date());
    startTime.setMinutes(0);
    startTime.setHours(0);
    startTime = startTime.getTime();
    [appUsages, setAppUsages] = useState(getUsageStats(startTime, endTime));
    let [allTime, setAllTime] = useState(0);
    const [rerenderToggle, setRerenderToggle] = useState(false);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [installedApps, setInstalledApps] = useState([]);
    const [allTimeCalculated, setAllTimeCalculated] = useState(false);
    const appColor = useMemo(() => generateCategoryColors(series.length), [series]);
    const [showAllApps, setShowAllApps] = useState(false);
    const [btnText, setBtnText] = useState(false);
    const toggleAppsVisibility = () => {
      setShowAllApps(!showAllApps);
      setBtnText(!btnText);
    };
   const screenWidth = Dimensions.get("window").width;


    useFocusEffect(
      React.useCallback(() => {
        console.log('Screen is focused. Rerendering...'); // Add this line for debugging
        setRerenderToggle((prev) => !prev);
      }, [])
    );
    useEffect(() => {
      const loadData = async () => {
        try {
          await loadCategories(setCategories, setLoading, setError);
        } catch (error) {
          console.error('Error loading categories:', error);
        }
      };
    
      loadData();
    }, [rerenderToggle]);
    
    useEffect(() => {
      fetchInstalledApps(setInstalledApps, setLoading, setError);
    }, []);
  
    useEffect(() => {
      const newSeries = [];
      let updatedTime = 0;
      if (categories !== null) {
        categories.forEach((category) => {
          let time = 0;
          category?.selectedApps.forEach((app) => {
            const found = appUsages.find((a) => a.app === app);
            if (found) {
              newSeries.push(found.time);
              time += parseInt(found.time);
            }
          });
          updatedTime += time;
        });
      }
        setSeries(newSeries);
        setAllTimeCalculated(true);
        setAllTime(updatedTime);
    }, [rerenderToggle, allTimeCalculated, categories]);
   
    const renderAllApps = () => {
      if (categories === null) {
        return null;
      }
      
      const renderApps = [];
    
      categories.forEach((category, categoryIndex) => {
        category.selectedApps.forEach((app, appIndex) => {
          let time = 0;
          let usageTime = category.usageTime;
          const found = appUsages.find((a) => a.app === app);
          if (found) {
            time = parseInt(found.time);
          }
    
          const appDetails = installedApps.find((value) => value.packageName === app);
          const usedTime = calculateHoursAndMinutes(time);
          const leftTime = calculateHoursAndMinutes(usageTime);
          const colorIndex = appIndex % appColor.length;
          renderApps.push({
            appIndex: `${categoryIndex}-${appIndex}`,
            appBlock: (
              <View key={`${categoryIndex}-${appIndex}`} style={styles.block}>
                <Image
                  source={{ uri: `data:image/png;base64,${appDetails?.icon}` }}
                  style={styles.img}
                />
                <Text style={styles.text}>{appDetails?.label}</Text>
                <View style={styles.numView2}>
                  <Text style={styles.number2} />
                </View>
                <View style={styles.BarAndTime}>
                  <DynamicBar
                    segment1={time}
                    segment2={usageTime - time}
                    color={appColor[colorIndex]}
                    style={styles.DynamicBar}
                    height={9}
                  />
                  <Text style={styles.time}>{usedTime} / {leftTime}</Text>
                </View>
              </View>
            ),
            time: time,
          });
        });
      });
    
      // Sort renderApps array based on screen time in descending order
      renderApps.sort((a, b) => b.time - a.time);
    
      return renderApps.map((app) => app.appBlock);
    };

    const renderVisibleApps = showAllApps ? renderAllApps() : renderAllApps().slice(0, 3);
    const renderText = btnText ? 'View less' : 'View more';
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
         <BarChart
         width={screenWidth}
         noOfSections={2}
         barBorderTopRightRadius={4}
         barBorderTopLeftRadius={4}
         frontColor="#354171"
         data={barData}
         yAxisThickness={0}
         xAxisThickness={1}
         xAxisColor={'#3A3D44'}
         yAxisLabelWidth={35}
         yAxisTextStyle={textStyle}
         xAxisLabelTextStyle={textStyle}
         yAxisSide={'Right'}
         rulesColor={'#3A3D44'}
         xAxisType={'solid'}
     />
      ) : (
        <>
        <BarChart
        width={screenWidth}
        noOfSections={2}
        barBorderTopRightRadius={4}
        barBorderTopLeftRadius={4}
        frontColor="#354171"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={1}
        xAxisColor={'#3A3D44'}
        yAxisLabelWidth={35}
        yAxisTextStyle={textStyle}
        xAxisLabelTextStyle={textStyle}
        yAxisSide={'Right'}
        rulesColor={'#3A3D44'}
        xAxisType={'solid'}
    />
  </>
      )}
          {renderVisibleApps}
          <Pressable title={showAllApps ? 'Show Top 3 Apps' : 'Show All Apps'} onPress={toggleAppsVisibility} style={styles.button}>
            <Text style={styles.buttonText}>{renderText}</Text>
            </Pressable>
        </View>
        </View>
      </ScrollView>
    );
};
const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
        paddingTop: 7,
        paddingBottom: 7,
        textAlign: 'center',
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