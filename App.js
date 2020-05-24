import React from "react";
import { Text } from "react-native";
import { Icon } from "react-native-elements";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import AddScreen from "./screens/AddScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StatsScreen from "./screens/StatsScreen";

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Adder") {
              if ((iconName = focused)) {
                return (
                  <Icon
                    name="pluscircle"
                    size={40}
                    color="#000000"
                    type="antdesign"
                  />
                );
              } else {
                return (
                  <Icon
                    name="pluscircle"
                    size={40}
                    color="#000000AA"
                    type="antdesign"
                  />
                );
              }
            } else if (route.name === "Home") {
              if ((iconName = focused)) {
                return (
                  <Icon name="home" size={25} color="#000000" type="entypo" />
                );
              } else {
                return (
                  <Icon name="home" size={25} color="#000000AA" type="entypo" />
                );
              }
            } else if (route.name === "Stats") {
              if ((iconName = focused)) {
                return (
                  <Icon
                    name="text-document"
                    size={25}
                    color="#000000"
                    type="entypo"
                  />
                );
              } else {
                return (
                  <Icon
                    name="text-document"
                    size={25}
                    color="#000000AA"
                    type="entypo"
                  />
                );
              }
            }

            // You can return any component that you like here!
          },
        })}
        tabBarOptions={{
          activeTintColor: "#000000",
          inactiveTintColor: "gray",
          style: { height: 55 },
          labelStyle: {},
        }}
      >
        <Tab.Screen name="Home" tabBarLabel="Home" component={HomeStackScreen} />
        <Tab.Screen
          name="Adder"
          component={AddScreen}
          options={{
            tabBarLabel: () => null,
            style: { padding: 50 },
          }}
        />
        <Tab.Screen name="Stats" tabBarLabel="Stats" component={StatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
