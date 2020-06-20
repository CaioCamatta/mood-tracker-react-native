import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import Constants from "expo-constants";
import { Button } from "react-native-elements";
import { AsyncStorage } from "react-native";
import {connect} from 'react-redux'
import { removeEntry } from "../redux/actions";

const decodedMoodEmoticons = [
  "sentiment-very-dissatisfied",
  "sentiment-dissatisfied",
  "sentiment-neutral",
  "sentiment-satisfied",
  "sentiment-very-satisfied",
  "circle-outline",
];
const decodedMoodPhrase = [
  "Depressed",
  "Dissatisfied",
  "Mediocre",
  "Satisfied",
  "Delighted",
  "-",
];
const decodedMoodColours = [
  "#54539D",
  "#7187D6",
  "#a6808c",
  "#ee964b",
  "#F67251",
  "#0000008A",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

class DetailsScreen extends React.Component {
  render() {
    // TODO: Subscribe only to changes in the relevant entry
    const entryObj = this.props.entries.filter((entry) => entry.date === this.props.route.params.date)[0]
    console.log("entry: ", entryObj)
    if (entryObj) {
      return (
        <View style={styles.container}>
          <View
            style={{
              alignItems: "flex-start",
              paddingLeft: 10,
              paddingTop: 10,
            }}
          >
            <Button
              onPress={() => this.props.navigation.goBack()}
              color="#fff"
              icon={
                <Icon
                  name="arrow-left"
                  size={32}
                  color="darkgray"
                  type="feather"
                />
              }
              style={{ position: "absolute", left: 0, flex: 1 }}
              iconLeft
              type="clear"
            />
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              alignItems: "center",
            }}
          >
            <Icon
              name={decodedMoodEmoticons[entryObj.mood]}
              color={decodedMoodColours[entryObj.mood]}
              size={120}
              type={entryObj.mood < 5 ? "ionicons" : "material-community"}
            />
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={[styles.h1, {color: decodedMoodColours[entryObj.mood]}]}>
                {decodedMoodPhrase[entryObj.mood]}
              </Text>
              <Text style={[styles.text, { fontWeight: "700" }]}>
                {entryObj.date.slice(4)}
              </Text>
              <Text style={[styles.text, {}]}>
                {days[new Date(entryObj.date).getDay()]}
              </Text>

              {entryObj.videoJournal ? (
                <Text style={[styles.journalText]}>
                  {entryObj.videoJournal}
                </Text>
              ) : entryObj.writtenJournal ? (
                <Text style={[styles.journalText]}>
                  {entryObj.writtenJournal}
                </Text>
              ) : (
                <Text style={[styles.journalText]}>Edit to Add Journal</Text>
              )}
            </View>
            <Button
              title="Edit"
              type="clear"
              onPress={() =>
                this.props.navigation.navigate("Adder", { ...entryObj })
              }
            ></Button>
            <Button
              title="Delete"
              type="clear"
              onPress={() => {
                this.props.removeEntry(entryObj.date)
                this.props.navigation.goBack();
              }}
              buttonStyle={{paddingTop:10}}
            ></Button>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
  },
  h1: {
    fontSize: 30,
    fontSize: 42,
    fontWeight: "400",
    paddingTop: 10,
    paddingBottom: 12,
    fontFamily: "sans-serif-light",
    color: "#454545",
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Roboto",
    color: "#656565",
  },
  journalText: {
    textAlign: "center",
    margin: 40,
  },
});

const mapStateToProps = state => ({
  entries: state.entries
})

export default connect(mapStateToProps, {removeEntry: removeEntry})(DetailsScreen)