/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import DayStatistics from './StatisticsScreenFiles/DayStatistics';
import WeekStatistics from './StatisticsScreenFiles/WeekStatistics';
import React from 'react';
export default function StatisticsScreen({ navigation }) {
  const [activeButton, setActiveButton] = useState(true);
const transfer = () => {
  setActiveButton((prev) => !prev);
};

  return (
    <View style={styles.Container}>
            {activeButton ? <DayStatistics transfer={transfer}/> :
            <WeekStatistics transfer={transfer}/>
            }
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'black',
    height: '100%',
  },
});
