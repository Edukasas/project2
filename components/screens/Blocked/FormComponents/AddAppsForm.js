/* eslint-disable prettier/prettier */
import  React, {Image, Text, StyleSheet, View, TouchableOpacity, Pressable, TextInput, Animated, FlatList} from 'react-native';
import { useEffect, useState, useRef} from 'react';
import { InstalledApps } from 'react-native-launcher-kit';
import { useTemporaryContext } from '../../../TemporaryContext';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddAppsForm({ onSubmit, onCancel, categoryToEdit }){
    const { temporaryState, temporaryDispatch } = useTemporaryContext();
    const [apps, setApps] = useState([]);
    const [selectedApps, setSelectedApps] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (categoryToEdit) {
        temporaryDispatch({ type: 'SET_CUSTOM_CATEGORY_NAME', payload: categoryToEdit.customCategoryName });
        temporaryDispatch({ type: 'SET_SELECTED_APPS', payload: categoryToEdit.selectedApps });
        temporaryDispatch({ type: 'USAGE_TIME_MINUTES', payload: categoryToEdit.parsedUsageMinutes.toString() });
        temporaryDispatch({ type: 'USAGE_TIME_SECONDS', payload: categoryToEdit.parsedUsageSeconds.toString() });
        temporaryDispatch({ type: 'BLOCKED_TIME_MINUTES', payload: categoryToEdit.parsedBlockedMinutes.toString() });
        temporaryDispatch({ type: 'BLOCKED_TIME_SECONDS', payload: categoryToEdit.parsedBlockedSeconds.toString() });
        temporaryDispatch({ type: 'SET_EDITING_CATEGORY', payload: true });
      }
    }, [categoryToEdit, temporaryDispatch]);
    


    useEffect(() => {
     const loadApps = async () => {
          try {
            const storedCategories = await AsyncStorage.getItem('categories');
            const parsedCategory = storedCategories ? JSON.parse(storedCategories) : [];
            let appList = await InstalledApps.getApps();
            
            appList = appList.filter((value, idx) => {
              let res = !parsedCategory.some(val => {
                  return val.selectedApps.includes(value.packageName);
              }) || (categoryToEdit && categoryToEdit.selectedApps && categoryToEdit.selectedApps.includes(value.packageName));
              return res;
            })
            setApps(appList);
            setSelectedApps(temporaryState.selectedApps);
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: false,
            }).start();
          } catch (error) {
            console.error('Error loading apps:', error);
          } finally {
            setLoading(false);
          }
        };
        loadApps();
      }, [temporaryState, setApps, setSelectedApps, fadeAnim, categoryToEdit]);

 
      const toggleAppSelection = (idx) => {
        const updatedSelectedApps = selectedApps.includes(idx)
          ? selectedApps.filter((selectedIdx) => selectedIdx !== idx)
          : [...selectedApps, idx];
    
        setSelectedApps(updatedSelectedApps);
        temporaryDispatch({ type: 'SET_SELECTED_APPS', payload: updatedSelectedApps });
      };

      const handleSubmit = () => {
         if (temporaryState.customCategoryName.trim().length === 0){
          setError(true);
          }
         else if (selectedApps.length === 0){
          alert('Select atleast 1 app');
         }
          else {
            setError(false);
            temporaryDispatch({ type: 'SET_SELECTED_APPS', payload: selectedApps });
            if (onSubmit) {
               onSubmit();
            }
          }
        };
        const handleCancel = () => {
          onCancel();
        };
    return (
          <Animated.View style={[styles.appContainer, { opacity: fadeAnim }]}>
           {!loading && (
          <View style={styles.topPart}>
        <Pressable onPress={handleCancel} style={styles.cancel}>
        <Image
        source={require('../../../../assets/images/cancel.png')}
      />
      </Pressable>
        <TextInput
          style={[styles.button, error && styles.errorInput]}
          placeholder="Enter category name"
          placeholderTextColor={error ? 'red' : '#BBC4EC'}
          value={temporaryState.customCategoryName}
          maxLength={20}
          onChangeText={(text) => {
            temporaryDispatch({ type: 'SET_CUSTOM_CATEGORY_NAME', payload: text });
        }}
  />
        <Pressable onPress={handleSubmit} style={styles.next}>
           <Image
        source={require('../../../../assets/images/next.png')}
      /></Pressable>
      </View>
           )}
      <FlatList
        data={apps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => toggleAppSelection(item.packageName)}
            style={[
              selectedApps.includes(item.packageName) && styles.selectedAppItem,
              index === apps.length - 1 && styles.lastAppItem,
            ]}
          >
            <View style={[styles.innerbg, index === apps.length - 1 && styles.lastInnerbg]}>
              <FastImage
                source={{ uri: 'data:image/png;base64,' + item.icon }}
                style={styles.img}
              />
              <Text style={styles.appLabel}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      </Animated.View>
    )}
const styles = StyleSheet.create({
    customActivityIndicator: {
      backgroundColor: '#191C25',
      justifyContent: 'center',
      flex: 1,
    },
    next: {
      alignSelf: 'center',
    },
    cancel: {
      alignSelf: 'center',
    },
    button: {
        color: '#BBC4EC',
        fontSize: 16,
        textAlign: 'center',
    },
  errorInput: {
    borderColor: 'red',
  },
    appContainer: {
      backgroundColor: '#191C25',
      borderRadius: 17,
      width: '100%',
      height: '95%',
      marginTop: 20,
      alignSelf: 'center',
    },
    lastAppItem: {
      borderBottomLeftRadius: 17,
      borderBottomRightRadius: 17,
  },
  lastInnerbg: {
    borderBottomWidth: 0,
  },
    innerbg: {
      marginLeft: 20,
      marginRight: 20,
      borderBottomWidth: 1,
      borderColor: '#3A3D44',
      alignItems: 'center',
      flexDirection: 'row',
      paddingTop: 7,
      paddingBottom: 7,
      gap: 10,
    },
    selectedAppItem: {
        backgroundColor: '#000061',
    },
    topPart: {
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth: 1,
        borderColor: '#3A3D44',
        paddingTop: 10,
        paddingBottom: 10,
    },
    appLabel: {
        color: 'white',
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
      },
    img: {
       width: 50,
       height: 50,
    }
})