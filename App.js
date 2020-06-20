import React from "react";
import { Text, Settings } from "react-native";
import { Icon } from "react-native-elements";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import AddScreen from "./screens/AddScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StatsScreen from "./screens/StatsScreen";

import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { addEntry, updateEntry, removeEntry } from "./redux/actions";
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="Settings" component={SettingsScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    console.log("Adding");
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    store.dispatch(
      addEntry({
        date: tomorrow.toDateString(),
        mood: 3,
        status: "Journal Added again",
        writtenJournal: "Test Journal",
      })
    );
    store.dispatch(removeEntry(tomorrow.toDateString()))

    console.log("app state:", store.getState());
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
                          size={30}
                          color="#F65058"
                          type="antdesign"
                        />
                      );
                    } else {
                      return (
                        <Icon
                          name="pluscircleo"
                          size={30}
                          color="#000000BB"
                          type="antdesign"
                        />
                      );
                    }
                  } else if (route.name === "Home") {
                    if ((iconName = focused)) {
                      return (
                        <Icon
                          name="home"
                          size={30}
                          color="#F65058"
                          type="entypo"
                        />
                      );
                    } else {
                      return (
                        <Icon
                          name="home"
                          size={30}
                          color="#000000BB"
                          type="entypo"
                        />
                      );
                    }
                  } else if (route.name === "Stats") {
                    if ((iconName = focused)) {
                      return (
                        <Icon
                          name="text-document"
                          size={30}
                          color="#F65058"
                          type="entypo"
                        />
                      );
                    } else {
                      return (
                        <Icon
                          name="text-document"
                          size={30}
                          color="#000000BB"
                          type="entypo"
                        />
                      );
                    }
                  }

                  // You can return any component that you like here!
                },
              })}
              tabBarOptions={{
                activeTintColor: "#F65058",
                inactiveTintColor: "gray",
                style: { height: 55 },
                labelStyle: {},
              }}
            >
              <Tab.Screen
                name="Home"
                tabBarLabel="Home"
                component={HomeStackScreen}
                options={{
                  tabBarLabel: () => null,
                }}
              />
              <Tab.Screen
                name="Adder"
                component={AddScreen}
                options={{
                  tabBarLabel: () => null,
                }}
              />
              <Tab.Screen
                name="Stats"
                tabBarLabel="Stats"
                component={StatsScreen}
                options={{
                  tabBarLabel: () => null,
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
