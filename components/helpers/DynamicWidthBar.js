import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DynamicWidthBar = ({ value, maxValue, color }) => {
  const maxWidth = 200; // Set your maximum width here

  // Calculate the width dynamically
  const width = Math.min((value / maxValue) * maxWidth, maxWidth);

  return (
    <View style={[styles.barContainer, { backgroundColor: color }]}>
      <View style={[styles.bar, { width }]} />
      <Text style={styles.valueText}/>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    height: 8,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    height: '100%',
    borderRadius: 5,
  },
  valueText: {
    marginLeft: 2,
  },
});

export {DynamicWidthBar};
