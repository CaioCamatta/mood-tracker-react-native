import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";

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

class StatsScreen extends React.Component {
  addEmptyEntries = (entries) => {
    startDate = entries[entries.length - 1].date;
    endDate = entries[0].date;
    var start = new Date(startDate);
    const end = new Date(endDate);

    // Create array of unique empty entries
    emptyEntries = [];
    while (start <= end) {
      entryObj = { mood: 5, date: new Date(start) };
      // Only add if entry is not already in the entries list
      if (!entries.some((entry) => entry.date.toDateString() === entryObj.date.toDateString())) {
        emptyEntries.push(entryObj);
      }
      start.setDate(start.getDate() + 1);
    }

    // Add together empty and non-empty
    allEntries = entries.concat(emptyEntries);
    allEntries.sort((a, b) => b.date - a.date);
    return allEntries;
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
    entriesWithJSDates = this.props.entries.map((entry) => ({
      ...entry,
      date: new Date(entry.date),
    }));
    entries = this.addEmptyEntries(entriesWithJSDates);
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Stats</Text>
        {!entries && (
          <Text style={{ paddingHorizontal: 20 }}>Nothing here yet.</Text>
        )}
        {entries && (
          <FlatList
            renderItem={this.renderIcon}
            data={entries}
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

const mapStateToProps = (state) => ({
  entries: state.entries,
});

export default connect(mapStateToProps)(StatsScreen);
