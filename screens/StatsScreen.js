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
  "test",
];
const entries = [];

export default class StatsScreen extends React.Component {
  state = {
    entries: null,
  };

  componentDidMount() {
    this._updater = this.props.navigation.addListener("focus", () => {
      this.retrieveData();
    });
  }

  databaseToEntry = (date, obj) => {
    const jsObj = JSON.parse(obj);
    entries.push({ date, ...jsObj });
  };

  retrieveData = async () => {
    try {
      // Get all objects
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);

      // Map each obj to an entry
      values.map((arr) => this.databaseToEntry(...arr));
      console.log("   success:", values);

      // Display real list only if it has 1 object
      values.length > 0 ? this.setState({ entries }) : null;
    } catch (error) {
      console.log("   fail:", error);
    }
  };

  renderIcons = ({ item }) => {
    const date = new Date(item.date);
    return (
      <View style={{ paddingTop: 20, flex: .166666 }}>
        <Icon
          name={decodedMoodEmoticons[item.mood]}
          color="#0000008A"
          size={40}
        />
        <Text>
          {date.getDate()}/{date.getDay()}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Stats</Text>
        {this.state.entries && (
          <FlatList
            renderItem={this.renderIcons}
            data={this.state.entries.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )}
            style={{ marginBottom: 85 }}
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
