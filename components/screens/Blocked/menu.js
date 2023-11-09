/* eslint-disable prettier/prettier */
import  React, {Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, Pressable, TextInput  } from 'react-native';
import { useEffect, useState} from 'react';
import MainBlocked from './MainBlocked';
import { InstalledApps } from 'react-native-launcher-kit';

export default function StartBlocked(){
    const [apps, setApps] = useState([]);
    const [selectedApps, setSelectedApps] = useState([]);
    const [customCategoryName, setCustomCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [showMain, setShowMain] = useState(false);
    useEffect(() => {
        // Load the apps when the component mounts
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
        const category = {
            name: customCategoryName,
            selectedAppIndices: selectedApps,
          };
          setCategories([...categories, category]);

          // Clear the custom category name and selected apps for the next category
          setCustomCategoryName('');
          setSelectedApps([]);
          // You can access and use the categories array for further processing
          setShowMain(true);
        };
    return (
        <View>
        {showMain ?
        ( <MainBlocked categories={categories} apps={apps}/>) :
    (
        <View>
        <Pressable  style={styles.button}><Text>Cancel</Text></Pressable>
        <TextInput
        style={styles.button}
        placeholder="Enter category name"
        value={customCategoryName}
        onChangeText={(text) => setCustomCategoryName(text)}
      />
        <Pressable onPress={handleSubmit} style={styles.button}><Text>Submit</Text></Pressable>
        <ScrollView vertically={true} style={styles.appContainer}>
    {apps.map((app, idx) => (
     <TouchableOpacity
     key={idx}
     onPress={() => toggleAppSelection(idx)}
     style={[
        styles.appItem,
        selectedApps.includes(idx) && styles.selectedAppItem,
            idx === 0 && styles.firstAppItem,
            idx === apps.length - 1 && styles.lastAppItem,
      ]}>

        <Image
        source={{ uri: 'data:image/png;base64,' + app.icon }}
        style={styles.img}
        />
        <Text style={styles.appLabel}>{app.label}</Text>

   </TouchableOpacity>
    ))}
  </ScrollView>
  </View>
    )}
        </View>
    );
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
    },
    appContainer: {
      backgroundColor: 'red',
      borderRadius: 17,
      width: '80%',
      height: 300,
      marginTop: 20,
      alignSelf: 'center',
    },
    appItem: {
      paddingTop: 7,
      paddingBottom: 7,
      paddingLeft: 15,
      gap: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    selectedAppItem: {
        backgroundColor: 'blue',
    },
    firstAppItem: {
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
    },
    lastAppItem: {
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,
    },
    appLabel: {
        color: 'white',
        fontFamily: 'Roboto-Regular',
        fontSize: 12, // You can adjust the font size
      },
    img: {
       width: 50,
       height: 50,
    }
})