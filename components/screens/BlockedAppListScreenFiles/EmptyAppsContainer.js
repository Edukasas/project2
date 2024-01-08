/* eslint-disable prettier/prettier */
import  React, {Image, Text, StyleSheet, View} from 'react-native';

export default function EmptyAppContainer(){
     return (
        <View style={styles.container}>
     <Image
        source={require('../../../assets/images/app_blocking.png')}
        style={styles.logo}
      />
            <Text style={styles.Text1}>No app limits created.</Text>
            <Text style={styles.Text2}>App limits enable you to use specific apps, block them for a set period, and then resume using them.</Text>
              </View>
      )}
const styles = StyleSheet.create({
    container: {
      marginTop: 194,
      alignItems: 'center',
      gap: 24,
      marginLeft: 65,
      marginRight: 65,
    },
    Text1: {
        fontFamily: 'Roboto-Bold',
        color: 'white',
        fontSize: 16,
    },
    Text2: {
        color: '#94A3E4',
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 17,
    },
});
