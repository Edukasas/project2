/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import DayStatistics from './StatisticsScreenFiles/DayStatistics';
import WeekStatistics from './StatisticsScreenFiles/WeekStatistics';
import React from 'react';
export default function StatisticsScreen({ navigation }) {
  const [activeButton, setActiveButton] = useState('day');

  const handlePress = (buttonName) => {
    setActiveButton(buttonName);
  };

  const isDayButtonActive = activeButton === 'day';
  const isWeekButtonActive = activeButton === 'week';

  return (
    <View style={styles.Container}>
      <View style={styles.topPart}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isDayButtonActive ? '#191C25' : '#010101' },
          ]}
          onPress={() => handlePress('day')}
          disabled={isDayButtonActive}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isDayButtonActive ? '#BBC4EC' : '#FFFFFF' },
              { fontWeight: isDayButtonActive ? '700' : '400' },
            ]}
          >
            Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isWeekButtonActive ? '#191C25' : '#010101' },
          ]}
          onPress={() => handlePress('week')}
          disabled={isWeekButtonActive}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isWeekButtonActive ? '#BBC4EC' : '#FFFFFF' },
              { fontWeight: isWeekButtonActive ? '700' : '400' },
            ]}
          >
            Week
          </Text>
        </TouchableOpacity>
      </View>
            {isDayButtonActive ? <DayStatistics/> :
            <WeekStatistics/>
            }
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'black',
    height: '100%',
  },
  topPart: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 16,
  },
  button: {
    color: '#BBC4EC',
    backgroundColor: '#191C25',
    fontSize: 14,
    fontWeight: '700',
    borderRadius: 17,
    margin: 5,
  },
  buttonText: {
    marginRight: 65,
    marginLeft: 65,
    marginTop: 9,
    marginBottom: 9,
    textAlign: 'center',
  },
});
