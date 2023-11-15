/* eslint-disable prettier/prettier */
import  React, {View, Text, StyleSheet, Image} from 'react-native';
import { useCategoryContext  } from './CategoryContext';

export default function MainBlocked({apps}) {
  const { state } = useCategoryContext();

  if (!apps || apps.length === 0) {
    // Handle the case where apps data is not available
    return <Text>Loading...</Text>;
  }
    return (
      <View style={styles.Container}>
        <View key={state.index}>
          <Text>{state.customCategoryName}</Text>
          {state.selectedApps.map((appIndex, appIndexIndex) => (
          <View key={appIndexIndex}>
            <Text>{apps[appIndex].label}</Text>
            <Image
              source={{ uri: 'data:image/png;base64,' + apps[appIndex].icon }}
              style={{ width: 50, height: 50 }}
            />
          </View>
        ))}
        </View>

    </View>
    );
  }
  const styles = StyleSheet.create({
    Container: {
      backgroundColor: 'red',
    },
  });
