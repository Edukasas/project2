/* eslint-disable prettier/prettier */
import  React, {Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, Pressable, TextInput, Alert  } from 'react-native';
import { useEffect, useState} from 'react';
import MainBlocked from './MainBlocked';
import { InstalledApps } from 'react-native-launcher-kit';
import { useCategoryContext } from './CategoryContext';

export default function StartBlocked(){
    const { state, dispatch } = useCategoryContext();
    const [apps, setApps] = useState([]);
    const [selectedApps, setSelectedApps] = useState([]);
    //const [customCategoryName, setCustomCategoryName] = useState('');
    //const [categories, setCategories] = useState([]);
    const [showMain, setShowMain] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const loadApps = async () => {
            const appList = await InstalledApps.getApps();
            setApps(appList);
        };
        loadApps();
      }, []);

      const toggleAppSelection = (idx) => {
        if (selectedApps.includes(idx)) {
          // If the app is already selected, remove it from the selection
          setSelectedApps(selectedApps.filter((selectedIdx) => selectedIdx !== idx));
        } else {
          // If the app is not selected, add it to the selection
          setSelectedApps([...selectedApps, idx]);
        }
      };

      const handleSubmit = () => {
        // const category = {
        //     name: state.customCategoryName,
        //     selectedAppIndices: selectedApps,
        //   };
         // setCategories([...categories, category]);
          // Clear the custom category name and selected apps for the next category
         // setCustomCategoryName('');
          //setSelectedApps([]);
          // You can access and use the categories array for further processing
         if (state.customCategoryName.length === 0){
          setError(true);
          }
         else if(selectedApps.length === 0){
          alert('Select atleast 1 app');
         }
          else {
            setError(false);
            dispatch({ type: 'SET_CUSTOM_CATEGORY_NAME', payload: state.customCategoryName });
            dispatch({ type: 'SET_SELECTED_APPS', payload: selectedApps });
            setShowMain(true);
          }
        };
    return (
        <View>
        {showMain ?
        ( <MainBlocked categories={state.categories} apps={apps}/>) :
    (
        <View  style={styles.appContainer}>
          <View style={styles.topPart}>
        <Pressable style={styles.cancel}>
        <Image
        source={require('../../../assets/images/cancel.png')}
      />
      </Pressable>
        <TextInput
          style={[styles.button, error && styles.errorInput]}
          placeholder="Enter category name"
          placeholderTextColor={error ? 'red' : '#BBC4EC'}
          value={state.customCategoryName}
          maxLength={20}
          onChangeText={(text) => {
              dispatch({ type: 'SET_CUSTOM_CATEGORY_NAME', payload: text });
          }}
  />
        <Pressable onPress={handleSubmit} style={styles.next}>
           <Image
        source={require('../../../assets/images/next.png')}
      /></Pressable>
      </View>
        <ScrollView vertically={true}>
    {apps.map((app, idx) => (
     <TouchableOpacity
     key={idx}
     onPress={() => toggleAppSelection(idx)}
     style={[
        selectedApps.includes(idx) && styles.selectedAppItem,
            idx === apps.length - 1 && styles.lastAppItem,
      ]}>
        <View style={styles.innerbg}>
        <Image
        source={{ uri: 'data:image/png;base64,' + app.icon }}
        style={styles.img}
        />
        <Text style={styles.appLabel}>{app.label}</Text>
        </View>
   </TouchableOpacity>
    ))}
  </ScrollView>
  </View>
    )}
        </View>
    );
}
const styles = StyleSheet.create({
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
      height: '100%',
      marginTop: 20,
      alignSelf: 'center',
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
        backgroundColor: 'blue',
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
    lastAppItem: {
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,
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