import {StyleSheet, Image, Text, View} from 'react-native';

export default function StatisticsScreen({navigation}) {
    navigation.setOptions({
        headerStyle: {
            height: 70
        },
        headerTitleStyle: {
            fontSize: 22,
           fontFamily: 'Roboto-Bold', // Set your desired font family
          },
    });
    return (
            <View style={styles.Container}>
                <Text onPress={() => navigation.navigate('Home')}
                style={styles.containertext}>Statistics Screen</Text>
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