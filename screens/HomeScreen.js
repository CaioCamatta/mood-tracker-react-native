import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Entry from "../components/Entry";
import Constants from "expo-constants";
import { AsyncStorage } from "react-native";

const sample_entries = [
  {
    date: new Date("2020-07-25").toDateString(),
    status: "Video Added",
    mood: 4,
  },
  {
    date: new Date("2020-07-24").toDateString(),
    status: "Video Added",
    mood: 1,
  },
  {
    date: new Date("2020-07-23").toDateString(),
    status: "Video Added",
    mood: 2,
  },
  {
    date: new Date("2020-07-22").toDateString(),
    status: "Video Added",
    mood: 3,
  },
  {
    date: new Date("2020-07-21").toDateString(),
    status: "Video Added",
    mood: 4,
  },
  {
    date: new Date("2020-07-20").toDateString(),
    status: "Video Added",
    mood: 2,
  },
  {
    date: new Date("2020-07-19").toDateString(),
    status: "Video Added",
    mood: 1,
  },
  {
    date: new Date("2020-07-18").toDateString(),
    status: "Video Added",
    mood: 2,
  },
  {
    date: new Date("2020-07-17").toDateString(),
    status: "Video Added",
    mood: 3,
  },
];

let real_entries = [];

export default class HomeScreen extends React.Component {
  state = {
    entries: sample_entries,
  };

  componentDidMount() {
    this._updater = this.props.navigation.addListener("focus", () => {
      console.log("Update");
      this.retrieveData();
    });
  }

  databaseToEntry = (date, obj) => {
    const jsObj = JSON.parse(obj);
    real_entries.push({ date, ...jsObj });
  };

  retrieveData = async () => {
    try {
      real_entries = [];
      // Get all objects
      const keys = await AsyncStorage.getAllKeys();
      //await AsyncStorage.multiRemove(keys)
      const values = await AsyncStorage.multiGet(keys);
      // console.log('data loaded:', values)

      // Map each obj to an entry
      values.map((arr) => this.databaseToEntry(...arr));

      // Display real list only if it has 1 object
      values.length > 0 ? this.setState({ entries: real_entries }) : null;
    } catch (error) {
      console.log("   fail:", error);
      // Error retrieving data
    }
  };

  renderEntries = ({ item, navigation }) => (
    <Entry {...item} date={item.date} navigation={this.props.navigation} />
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Entries</Text>
        <View>
          <FlatList
            renderItem={this.renderEntries}
            data={this.state.entries.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )}
            style={{ marginBottom: 85 }}
            keyExtractor={(item) => item.date.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
  h1: {
    fontSize: 30,
    padding: 20,
    paddingBottom: 10,
  },
});
