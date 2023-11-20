/* eslint-disable prettier/prettier */
import {StyleSheet, Image, Text, View} from 'react-native';
import { InstalledApps } from 'react-native-launcher-kit';
import React  from 'react';
export default function HomeScreen({navigation}) {
  const apps = InstalledApps.getApps();
     navigation.setOptions({
    headerTitle: () => (
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
    ),
  });
    return (
        
            <View style={styles.Container}>
                <Text onPress={() => alert('This is home screen')}
                 style={styles.containertext}>HomeScreen</Text>
                 {
  apps.map((item, idx) => {
    return <Image key={idx} source={{uri: 'data:image/png;base64,'+item.icon}} style={{width: 50, height: 50}} />
  })
}
            </View>
    );
}

const styles = StyleSheet.create({
    Header: {
        backgroundColor: '#354171',
    },
    logo: {
        width: 112,
        height: 48,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 11,
    },
    containertext: {
        color: 'white',
        textAlign: 'center',
    },
    Container: {
        backgroundColor: 'black',
        flex: 1,
    }
});