import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';

import Entry from './components/Entry'

const sample_entries = [
  {date: new Date("2020-07-25"), status: 'Video Added', mood:4},
  {date: new Date("2020-07-24"), status: 'Video Added', mood:1},
  {date: new Date("2020-07-23"), status: 'Video Added', mood:2},
  {date: new Date("2020-07-22"), status: 'Video Added', mood:3},
  {date: new Date("2020-07-21"), status: 'Video Added', mood:4},
  {date: new Date("2020-07-20"), status: 'Video Added', mood:5},
  {date: new Date("2020-07-19"), status: 'Video Added', mood:1},
  {date: new Date("2020-07-18"), status: 'Video Added', mood:2},
  {date: new Date("2020-07-17"), status: 'Video Added', mood:3},
]

class HomeScreen extends React.Component {
  state = {
    entries: sample_entries,
  }

  renderEntries = ({item}) => <Entry {...item} date={item.date.toDateString()}/>

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Entries</Text>
        <View>
          <FlatList
            renderItem={this.renderEntries}
            data={this.state.entries.sort((a, b) => b.date - a.date)}
            style={{marginBottom: 85}}
            keyExtractor={item => item.date.toString()}
          />
        </View>
      </View>
    );
  }
}

function AdderScreen() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="LOG" component={HomeScreen} />
        <Tab.Screen name="+" component={AdderScreen} />
        <Tab.Screen name="STATS" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  h1: {
    fontSize: 30,
    padding: 20,
    paddingBottom: 10,
  }
});
