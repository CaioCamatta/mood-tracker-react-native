import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen'
import DetailsScreen from './screens/DetailsScreen'
import AddScreen from './screens/AddScreen'
import SettingsScreen from './screens/SettingsScreen'
import StatsScreen from './screens/StatsScreen'

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />             
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="LOG" component={HomeStackScreen} />
        <Tab.Screen name="Adder" component={AddScreen} />
        <Tab.Screen name="STATS" component={StatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}