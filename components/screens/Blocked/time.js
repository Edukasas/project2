/* eslint-disable prettier/prettier */
import  React, {Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, Pressable, TextInput, Alert  } from 'react-native';
import { useEffect, useState} from 'react';
import MainBlocked from './MainBlocked';
import { InstalledApps } from 'react-native-launcher-kit';
import { useCategoryContext } from './CategoryContext';

export default function StartBlocked(){
    const handleSubmit = () => {
        alert('Hello');
        };
        const [numberValue, setNumberValue] = useState('');
        const handleNumberChange = (text) => {
            // Handle changes to the number input value
            setNumberValue(text);
          };
    return (
        <ScrollView vertically={true} style={styles.timeContainer}>
              <View style={styles.topPart}>
        <Pressable style={styles.cancel}>
        <Image
        source={require('../../../assets/images/cancel.png')}
      />
      </Pressable>
        <Text style={styles.button}>Enter time</Text>
        <Pressable onPress={handleSubmit} style={styles.next}>
           <Image
        source={require('../../../assets/images/add.png')}
      /></Pressable>
      </View>
      <Text style={styles.h1}>Usage Time</Text>
      <View style={styles.biggerblock}>
        <View>
        <TextInput
        keyboardType="numeric"
        value={numberValue}
        onChangeText={handleNumberChange}
        style={styles.block1}
      />
      <Text style={styles.name}>Minute</Text>
      </View>
      <Text style={styles.semicolon}>:</Text>
      <View>
        <TextInput
        keyboardType="numeric"
        value={numberValue}
        onChangeText={handleNumberChange}
        style={styles.block2}
      />
      <Text style={styles.name}>Second</Text>
      </View>
      </View>
      <Text style={styles.h1}>Block Time</Text>
      <View style={styles.biggerblock}>
        <View>
        <TextInput
        keyboardType="numeric"
        value={numberValue}
        onChangeText={handleNumberChange}
        style={styles.block1}
      />
      <Text style={styles.name}>Minute</Text>
      </View>
      <Text style={styles.semicolon}>:</Text>
      <View>
        <TextInput
        keyboardType="numeric"
        value={numberValue}
        onChangeText={handleNumberChange}
        style={styles.block2}
      />
      <Text style={styles.name}>Second</Text>
      </View>
      </View>
        </ScrollView>
);
}
const styles = StyleSheet.create({
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