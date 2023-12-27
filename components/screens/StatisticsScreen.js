/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useState, useEffect, useRef } from 'react';
export default function StatisticsScreen({navigation}) {
    const [isButtonPressed, setButtonPressed] = useState(false);

    const handlePress = () => {
        setButtonPressed(!isButtonPressed);
    };

    const buttonColor = isButtonPressed ? '#FF5733' : '#191C25';
    const textColor = isButtonPressed ? '#191C25' : '#BBC4EC';
    return (
            <View style={styles.Container}>
                <View style={styles.topPart}>
                    <TouchableOpacity
                    style={[styles.button, { backgroundColor: buttonColor }]}
                    onPress={handlePress}
                >
                    <Text style={[styles.buttonText, { color: textColor }]}>Day</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: buttonColor }]}
                    onPress={handlePress}
                >
                    <Text style={[styles.buttonText, { color: textColor }]}>Week</Text>
                </TouchableOpacity>
                </View>
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
    },
    button: {
        color: '#BBC4EC',
        backgroundColor: '#191C25',
        fontSize: 14,
        fontWeight: '700',
        borderRadius: 17,
    },
    buttonText: {
        marginTop: 9,
        marginBottom: 9,
        marginLeft: 66,
        marginRight: 66,
        textAlign: 'center',
    },
});