import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Icon } from "react-native-elements";
import { AsyncStorage } from "react-native";

const decodedMoodEmoticons = [
  "sentiment-very-dissatisfied",
  "sentiment-dissatisfied",
  "sentiment-neutral",
  "sentiment-satisfied",
  "sentiment-very-satisfied",
  "circle-outline",
];
const decodedMoodColours = [
  "#54539D",
  "#7187D6",
  "#a6808c",
  "#ee964b",
  "#F67251",
  "#0000008A",
];
var entries = [];

export default class StatsScreen extends React.Component {
  state = {
    entries: null,
  };

  componentDidMount() {
    this._updater = this.props.navigation.addListener("focus", () => {
      this.retrieveData();
    });
  }

  pushUnique = (obj) => {
    if (entries) {
      entries.findIndex(
        (x) => x.date.toDateString() === obj.date.toDateString()
      ) === -1
        ? entries.push(obj)
        : null;
    } else {
      entries.push(obj);
    }
  };

  retrieveData = async () => {
    try {
      // Get all objects
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);

      // Map each obj to an entry
      values.map((arr) =>
        this.pushUnique({ date: new Date(arr[0]), ...JSON.parse(arr[1]) })
      );

      // Display real list only if it has 1 object
      if (entries.length > 0) {
        entries.sort((a, b) => b.date - a.date);

        // Fill entries
        this.addEmptyEntries(entries[entries.length - 1].date, entries[0].date);
      }
    } catch (error) {
      console.log("   Fail:", error);
    }
  };

  addEmptyEntries = (startDate, endDate) => {
    var start = new Date(startDate);
    const end = new Date(endDate);
    while (start <= end) {
      entryObj = { mood: 5, date: new Date(start) };
      this.pushUnique(entryObj);
      start.setDate(start.getDate() + 1);
    }
    entries.sort((a, b) => b.date - a.date);
    this.setState({ entries: entries });
  };

  renderIcon = ({ item }) => {
    return (
      <View style={{ paddingTop: 20, width: "14.285714285%" }}>
        <Icon
          name={decodedMoodEmoticons[item.mood]}
          color={decodedMoodColours[item.mood]}
          size={40}
          type={item.mood < 5 ? "ionicons" : "material-community"}
        />
        <Text style={{ textAlign: "center" }}>
          {item.date.getDate()}/{item.date.getMonth()}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Stats</Text>
        {!this.state.entries && (
          <Text style={{ paddingHorizontal: 20 }}>Nothing here yet.</Text>
        )}
        {this.state.entries && (
          <FlatList
            renderItem={this.renderIcon}
            data={this.state.entries}
            style={{ marginHorizontal: 30 }}
            keyExtractor={(item) => item.date}
            horizontal={false}
            numColumns={7}
          />
        )}
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
