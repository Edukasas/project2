/* eslint-disable prettier/prettier */
import  React, {Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, Pressable, TextInput, Alert  } from 'react-native';
import { useState} from 'react';
import { useCategoryContext } from '../../../CategoryContext';

export default function TimeForm({ refresh }){
        const {state, dispatch} = useCategoryContext();
        const [UsageMinutes, setUsageMinutes] = useState('');
        const [UsageSeconds, setUsageSeconds] = useState('');
        const [BlockedMinutes, setBlockedMinutes] = useState('');
        const [BlockedSeconds, setBlockedSeconds] = useState('');
        const isUsageMinutesSet = UsageMinutes !== '';
        const isUsageSecondsSet = UsageSeconds !== '';
        const isBlockedMinutesSet = BlockedMinutes !== '';
        const isBlockedSecondsSet = BlockedSeconds !== '';
        const isValidInput = (text) => /^\d+$/.test(text) || text === '';
        const handleSubmit = () => {
          if ((isBlockedMinutesSet || isBlockedSecondsSet) && (isUsageMinutesSet || isUsageSecondsSet)){
            const usageTime = parseInt(UsageMinutes) * 60 + parseInt(UsageSeconds);
            const blockedTime = parseInt(BlockedMinutes) * 60 + parseInt(BlockedSeconds);
            dispatch({ type: 'USAGE_TIME', payload: usageTime });
            dispatch({ type: 'BLOCKED_TIME', payload: blockedTime });
            console.log(usageTime);
            refresh();
          }
          else{
            alert('Input Time');
          }
            };
            const handleUsageMinutes = (text) => {
              if (isValidInput(text)) {
                setUsageMinutes(text);
              } else {
                console.error('Invalid input. Please enter only numeric values.');
              }
            };
            const handleUsageSeconds = (text) => {
              if (isValidInput(text)) {
                setUsageSeconds(text);
              } else {
                console.error('Invalid input. Please enter only numeric values.');
              }
            };
            const handleBlockedMinutes = (text) => {
            if (isValidInput(text)) {
              setBlockedMinutes(text);
            } else {
              console.error('Invalid input. Please enter only numeric values.');
            }
          };
          const handleBlockedSeconds = (text) => {
            if (isValidInput(text)) {
              setBlockedSeconds(text);
            } else {
              console.error('Invalid input. Please enter only numeric values.');
            }
          };
    return (
   

<ScrollView vertically={true} style={styles.timeContainer}>
              <View style={styles.topPart}>
        <Pressable style={styles.cancel}>
        <Image
        source={require('../../../../assets/images/cancel.png')}
      />
      </Pressable>
        <Text style={styles.button}>Enter time</Text>
        <Pressable onPress={handleSubmit} style={styles.next}>
           <Image
        source={require('../../../../assets/images/add.png')}
      /></Pressable>
      </View>
      <Text style={styles.h1}>Usage Time</Text>
      <View style={styles.biggerblock}>
        <View>
        <TextInput
        keyboardType="numeric"
        value={UsageMinutes}
        onChangeText={handleUsageMinutes}
        maxLength={2}
        style={styles.block1}
        placeholder="00"
        defaultValue="00"
        placeholderTextColor={styles.placeholderStyleMinutes.color}
      />
      <Text style={styles.name}>Minute</Text>
      </View>
      <Text style={styles.semicolon}>:</Text>
      <View>
        <TextInput
        keyboardType="numeric"
        value={UsageSeconds}
        onChangeText={handleUsageSeconds}
        maxLength={2}
        style={styles.block2}
        placeholder="00"
        defaultValue="00"
        placeholderTextColor={styles.placeholderStyleSeconds.color}
      />
      <Text style={styles.name}>Second</Text>
      </View>
      </View>
      <Text style={styles.h1}>Block Time</Text>
      <View style={styles.biggerblock}>
        <View>
        <TextInput
        keyboardType="numeric"
        value={BlockedMinutes}
        onChangeText={handleBlockedMinutes}
        maxLength={2}
        style={styles.block1}
        placeholder="00"
        defaultValue="00"
        placeholderTextColor={styles.placeholderStyleMinutes.color}
      />
      <Text style={styles.name}>Minute</Text>
      </View>
      <Text style={styles.semicolon}>:</Text>
      <View>
        <TextInput
        keyboardType="numeric"
        value={BlockedSeconds}
        onChangeText={handleBlockedSeconds}
        maxLength={2}
        style={styles.block2}
        placeholder="00"
        defaultValue="00"
        placeholderTextColor={styles.placeholderStyleSeconds.color}
      />
      <Text style={styles.name}>Second</Text>
      </View>
      </View>
        </ScrollView>
);
}
const styles = StyleSheet.create({
  placeholderStyleSeconds: {
    color: 'white',
  },
  placeholderStyleMinutes: {
    color: '#94A3E4',
  },
    biggerblock: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    semicolon: {
        color: '#BBC4EC',
        fontSize: 57,
        marginLeft: 10,
        marginRight: 10,
    },
    name: {
        color: '#BBC4EC',
        marginTop: 7,
        textAlign: 'right',
    },
    block2: {
        paddingBottom: 9,
          paddingTop: 9,
          paddingRight: 20,
          paddingLeft: 20,
          fontSize: 45,
          color: 'white',
          backgroundColor: '#94A3E4',
          borderRadius: 8,
          gap: 1,
          borderWidth: 2,
          borderColor: '#94A3E4',
          width: 96,
          textAlign: 'right',
    },
    block1: {
        paddingBottom: 9,
          paddingTop: 9,
          paddingRight: 20,
          paddingLeft: 20,
          fontSize: 45,
          color: '#94A3E4',
          backgroundColor: '#354171',
          borderRadius: 8,
          gap: 1,
          borderWidth: 2,
          borderColor: '#94A3E4',
          width: 96,
          textAlign: 'right',
    },
    timeContainer: {
        backgroundColor: '#191C25',
        borderRadius: 17,
        width: '100%',
        height: 600,
        marginTop: 20,
        alignSelf: 'center',
      },
      button: {
        color: '#BBC4EC',
        fontSize: 16,
    },
    h1: {
        color: '#BBC4EC',
        fontSize: 16,
        marginLeft: 50,
        marginTop: 40,
        marginBottom: 40,
    },
    next: {
        alignSelf: 'center',
      },
      cancel: {
        alignSelf: 'center',
      },
      topPart: {
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
    },
})