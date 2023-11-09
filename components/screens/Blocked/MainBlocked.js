/* eslint-disable prettier/prettier */
import  React, {View, Text, StyleSheet, Image} from 'react-native';

export default function MainBlocked({ categories, apps }) {
    return (
      <View style={styles.Container}>
        {categories.map((category, index) => (
          <View key={index}>
            <Text>{category.name}</Text>
            {category.selectedAppIndices.map((appIndex, appIndexIndex) => (
            <View key={appIndexIndex}>
              <Text>{apps[appIndex].label}</Text>
              <Image
                source={{ uri: 'data:image/png;base64,' + apps[appIndex].icon }}
                style={{ width: 50, height: 50 }}
              />
            </View>
          ))}
          </View>
        ))}
      </View>
    );
  }
  const styles = StyleSheet.create({
    Container: {
      backgroundColor: 'red',
    },
  });
