/* eslint-disable prettier/prettier */
import { StyleSheet, View, Text } from "react-native";
import React from "react";
export default function DayStatistics(){
    return (
        <View>
            <Text style={styles.text}>Day</Text>
     </View>
    );
};
const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
});