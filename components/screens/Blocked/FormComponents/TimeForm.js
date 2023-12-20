/* eslint-disable prettier/prettier */
import  React, {Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, Pressable, TextInput, Alert  } from 'react-native';
import { useState,useEffect} from 'react';
import { useTemporaryContext } from '../../../TemporaryContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TimeForm({ update, returnToApps, categoryToEdit }){
        const { temporaryState, temporaryDispatch } = useTemporaryContext();
        const [categories, setCategories] = useState([]);
        const UsageMinutes = temporaryState.usageTimeMinutes;
        const UsageSeconds = temporaryState.usageTimeSeconds;
        const BlockedMinutes = temporaryState.blockedTimeMinutes;
        const BlockedSeconds = temporaryState.blockedTimeSeconds;
        const isEditing = temporaryState.editingCategory;
        const customCategoryName = temporaryState.customCategoryName;
        const isValidInput = (text) => /^\d+$/.test(text) || text === '';
        useEffect(() => {
          const loadData = async () => {
            try {
              // Load category from AsyncStorage
              const storedCategory = await AsyncStorage.getItem('categories');
              const parsedCategory = storedCategory ? JSON.parse(storedCategory) : [];
              setCategories(parsedCategory);
            } catch (categoryError) {
              console.error('Error fetching category:', categoryError);
            } 
          };
          loadData();
        }, []);
        const handleSubmit = async() => {
          if ((UsageMinutes || UsageSeconds) && (BlockedMinutes || BlockedSeconds)){
            const parsedUsageMinutes = parseInt(UsageMinutes) || 0;
            const parsedUsageSeconds = parseInt(UsageSeconds) || 0;
            const parsedBlockedMinutes = parseInt(BlockedMinutes) || 0;
            const parsedBlockedSeconds = parseInt(BlockedSeconds) || 0;
            const usageTime = parsedUsageMinutes * 60 + parsedUsageSeconds;
            const blockedTime = parsedBlockedMinutes * 60 + parsedBlockedSeconds;
                  const newCategory = {
                    customCategoryName: customCategoryName,
                    selectedApps: temporaryState.selectedApps,
                    parsedUsageMinutes,
                    parsedUsageSeconds,
                    parsedBlockedMinutes,
                    parsedBlockedSeconds,
                    usageTime,
                    blockedTime,
                  };
                  if (isEditing) {
                   // Editing existing category
                    const updatedCategories = categories.map((existingCategory) =>
                      existingCategory.customCategoryName === temporaryState.editingCategoryKey
                        ? { ...existingCategory, ...newCategory }
                        : existingCategory
                    );
                    await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
                    setCategories(updatedCategories);
                  }
                   else {
                    // Creating a new category
                    try {
                      const updatedCategories = [...categories, newCategory];
                      await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
                      setCategories(updatedCategories);
                    } catch (error) {
                      console.error('Error saving state to AsyncStorage:', error);
                    }
                  }
                    update();
          }
          else{
            alert('Input Value');
          }
        };
          const handleCancel = () => {
            temporaryDispatch({ type: 'COMING_BACK_WHEN_EDITING', payload: false});
            returnToApps();
            };
            const handleUsageMinutes = (text) => {
              if (isValidInput(text)) {
                temporaryDispatch({ type: 'USAGE_TIME_MINUTES', payload: text});
              } else {
                console.error('Invalid input. Please enter only numeric values.');
              }
            };
            const handleUsageSeconds = (text) => {
              if (isValidInput(text)) {
                temporaryDispatch({ type: 'USAGE_TIME_SECONDS', payload: text});
              } else {
                console.error('Invalid input. Please enter only numeric values.');
              }
            };
            const handleBlockedMinutes = (text) => {
            if (isValidInput(text)) {
              temporaryDispatch({ type: 'BLOCKED_TIME_MINUTES', payload: text});
            } else {
              console.error('Invalid input. Please enter only numeric values.');
            }
          };
          const handleBlockedSeconds = (text) => {
            if (isValidInput(text)) {
              temporaryDispatch({ type: 'BLOCKED_TIME_SECONDS', payload: text});
            } else {
              console.error('Invalid input. Please enter only numeric values.');
            }
          };
    return (
   

<ScrollView vertically={true} style={styles.timeContainer} keyboardShouldPersistTaps="handled">
              <View style={styles.topPart}>
        <Pressable onPress={handleCancel} style={styles.cancel}>
        <Image
        source={require('../../../../assets/images/back.png')}
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
        value={temporaryState.usageTimeMinutes}
        onChangeText={handleUsageMinutes}
        maxLength={2}
        style={styles.block1}
        placeholder="00"
        placeholderTextColor={styles.placeholderStyleMinutes.color}
      />
      <Text style={styles.name}>Minute</Text>
      </View>
      <Text style={styles.semicolon}>:</Text>
      <View>
        <TextInput
        keyboardType="numeric"
        value={temporaryState.usageTimeSeconds}
        onChangeText={handleUsageSeconds}
        maxLength={2}
        style={styles.block2}
        placeholder="00"
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
        value={temporaryState.blockedTimeMinutes}
        onChangeText={handleBlockedMinutes}
        maxLength={2}
        style={styles.block1}
        placeholder="00"
        placeholderTextColor={styles.placeholderStyleMinutes.color}
      />
      <Text style={styles.name}>Minute</Text>
      </View>
      <Text style={styles.semicolon}>:</Text>
      <View>
        <TextInput
        keyboardType="numeric"
        value={temporaryState.blockedTimeSeconds}
        onChangeText={handleBlockedSeconds}
        maxLength={2}
        style={styles.block2}
        placeholder="00"
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
        paddingTop: 21,
        paddingBottom: 16,
    },
});