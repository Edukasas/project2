/* eslint-disable prettier/prettier */
import  React, {Image, Text, Pressable, StyleSheet, View} from 'react-native';
import Menu from './FormComponents/AddAppsForm';
import { useState} from 'react';

export default function StartBlocked(){
    const [showMenu, setShowMenu] = useState(false);
    const navigateToMenu = () => {
      setShowMenu(true);
    };
     return(
     <View>
      {showMenu ? (
        <Menu/>
      ) : (
        <View>
     <Image
        source={require('../../../assets/images/app_blocking.png')}
        style={styles.logo}
      />
            <Text style={styles.Text1}>No app limits created.</Text>
            <Text style={styles.Text2}>App limits enable you to use specific apps, block them for a set period, and then resume using them.</Text>
            <Pressable
            onPress={navigateToMenu}
              style={styles.button}>
                <Text style={styles.buttonText}>Create app limit</Text>
              </Pressable>
              </View>
      )}
          </View>
    );
}
const styles = StyleSheet.create({
    appContainer: {
      backgroundColor: 'red',
      borderRadius: 17,
      width: '80%',
      alignSelf: 'center',
    },
    appItem: {
      marginTop: 15,
      marginLeft: 15,
      gap: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    appLabel: {
      color: 'white',
      fontFamily: 'Roboto-Regular',
      fontSize: 12,
    },
    img: {
       width: 50,
       height: 50,
    },
    logo: {
        marginTop: 194,
        alignSelf: 'center',
    },
    Text1: {
        alignSelf: 'center',
        marginTop: 24,
        marginBottom: 24,
        fontFamily: 'Roboto-Bold',
        color: 'white',
        fontSize: 16,
    },
    Text2: {
        color: '#94A3E4',
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        textAlign: 'center',
        alignSelf: 'center',
        width: 248,
        lineHeight: 17,
    },
    button: {
        backgroundColor: '#14151A',
        borderRadius: 17,
        alignSelf: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: '#BBC4EC',
        fontFamily: 'Roboto-Bold',
        alignSelf: 'center',
        marginTop: 9,
        marginBottom: 9,
        marginLeft: 29,
        marginRight: 29,
    },
});
