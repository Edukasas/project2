/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Screens
import HomeScreen from './screens/HomeScreen';
import BlockedAppScreen from './screens/BlockedAppListScreen';
import SettingsScreen from './screens/SettingsScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import { iconSources } from './IconSources';
import { ActiveIcon} from './IconComponents';
// Screen Names
const homeName = 'Home';
const BlockedAppListName = 'Apps Blocked';
const StatisticsName = 'Statistics';
const SettingsName = 'Settings';

const Tab = createBottomTabNavigator();

const MyTheme = {
  colors: {
    background: '#354171',
    text: 'white',
  }
};

export default function MainContainer() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarStyle: { height: 80, backgroundColor: '#354171' },
          tabBarLabelStyle: { paddingBottom: 16, fontFamily: 'Roboto-Medium' },
          tabBarIcon: ({ focused }) => {
            const rn = route.name;
            const iconSource = iconSources[rn];
          
            if (iconSource) {
              const source = focused ? iconSource.active : iconSource.inactive;
              return source ? <ActiveIcon source={source} /> : null;
            }
            return null;
          },
          tabBarActiveTintColor: 'white', 
        tabBarInactiveTintColor: '#DDE1FF',          
        })}
        
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={BlockedAppListName} component={BlockedAppScreen} />
        <Tab.Screen name={StatisticsName} component={StatisticsScreen} />
        <Tab.Screen name={SettingsName} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
