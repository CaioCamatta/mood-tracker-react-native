import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Entry from "../components/Entry";
import Constants from "expo-constants";
import { Icon, Button } from "react-native-elements";
import {connect} from 'react-redux'
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

class HomeScreen extends React.Component {
  renderEntries = ({ item, navigation }) => (
    <Entry {...item} date={item.date} navigation={this.props.navigation} />
  );

  showStreaksNotification = (streaks) => {
    if (streaks > 1) {
      showMessage({
        message: `You're on a roll. ${streaks} streaks!`,
        type: "success",
      });
    }
  }

  calculateStreaks = (entries) => {
    // Create array of unique empty entries
    let counting = true;
    let streaks = 0;
    let start = (new Date());
    while (counting) {
      entryObj = { mood: 5, date: new Date(start) };
      // Only add if entry is not already in the entries list
      if (entries.find((entry) => entry.date=== entryObj.date.toDateString())) {
        streaks++;
      } else {
        counting = false;
      }
      start.setDate(start.getDate() -1);
    }
    return streaks
  }

  componentDidMount(){
    this.showStreaksNotification(this.calculateStreaks(this.props.entries));
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.h1}>Entries</Text>
          <Button
            onPress={() => this.props.navigation.navigate("Settings")}
            color="#fff"
            icon={
              <Icon
                name="settings"
                size={24}
                color="darkgray"
                type="feather"
                style={{
                  padding: 20,
                  paddingBottom: 10,
                }}
              />
            }
            iconLeft
            type="clear"
          />
        </View>
        <View>
          <FlatList
            renderItem={this.renderEntries}
            data={this.props.entries.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )}
            style={{ marginBottom: 60 }}
            keyExtractor={(item) => item.date.toString()}
          />
        </View>
        <FlashMessage position="top" />
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

const mapStateToProps = state => ({
  entries: state.entries,
})

export default connect(mapStateToProps)(HomeScreen)
