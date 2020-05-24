import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Entry from "../components/Entry";
import Constants from "expo-constants";
import { AsyncStorage } from "react-native";

let real_entries = [];

export default class HomeScreen extends React.Component {
  state = {
    entries: [],
  };

  componentDidMount() {
    this._updater = this.props.navigation.addListener("focus", () => {
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

      // Map each obj to an entry
      values.map((arr) => this.databaseToEntry(...arr));

      // Display real list only if it has 1 object
      this.setState({ entries: real_entries })
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
            style={{ marginBottom: 60 }}
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
