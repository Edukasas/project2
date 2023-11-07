import {StyleSheet, Image, Text, View} from 'react-native';

export default function SettingsScreen({navigation}) {
    navigation.setOptions({
        headerStyle: {
          height: 70
        },
        headerTitleStyle: {
            fontSize: 22,
           fontFamily: 'Roboto-Bold',
          },
    });
    return (
            <View style={styles.Container}>
                <Text onPress={() => navigation.navigate('Home')}
                 style={styles.containertext}>Settings Screen</Text>
            </View>
    );
}

const styles = StyleSheet.create({
    containertext: {
        color: 'white',
        textAlign: 'center',
    },
    Container: {
        backgroundColor: 'black',
        height: '100%',
    }
});