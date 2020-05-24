import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Platform,
  AsyncStorage,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Icon } from "react-native-elements";
import Constants from "expo-constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const decodedMoodPhrase = [
  "Depressed",
  "Dissatisfied",
  "Average",
  "Satisfied",
  "Delighted",
  "-",
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

const decodedMoodColours = [
  "#54539D",
  "#7187D6",
  "#a6808c",
  "#ee964b",
  "#F67251",
  "#0000008A",
];
// TODO make this update better with parameters
class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 5,
      date: new Date(),
      mode: "date",
      show: false,
      writtenJournal: "",
      allowPopulating: true,
    };
  }

  componentDidMount() {
    // If tab is pressed, reset state
    this._onPressListener = this.props.navigation.addListener(
      "tabPress",
      () => {
        this.setState({
          mood: 5,
          date: new Date(),
          mode: "date",
          show: false,
          writtenJournal: "",
          allowPopulating: false,
        });
      }
    );

    this._updater = this.props.navigation.addListener("focus", () => {

      if (this.props.route.params && this.state.allowPopulating) {
        this.setState({
          ...this.props.route.params,
          date: new Date(this.props.route.params.date),
        });
      }
    });

    this._resetter = this.props.navigation.addListener("blur", () => {
      this.setState({ allowPopulating: true });
    });
  }

  // Delete listeners
  componentWillUnmount() {
    this._onPressListener();
    this._updater();
  }

  handleTextChange = (writtenJournal) => {
    this.setState({ writtenJournal });
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({ show: Platform.OS === "ios" });
    this.setState({ date: currentDate });
  };

  showMode = (currentMode) => {
    this.setState({ show: true, mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode("date");
  };

  storeData = async () => {
    try {
      // Write object before storing
      const entryObj = this.state.writtenJournal
        ? {
            mood: this.state.mood,
            status: "Journal Added",
            writtenJournal: this.state.writtenJournal,
          }
        : {
            mood: this.state.mood,
            status: "No Journal Added",
            writtenJournal: "",
          };

      await AsyncStorage.setItem(
        this.state.date.toDateString(),
        JSON.stringify(entryObj)
      ).then(() => {
        this.props.navigation.goBack();
      });
    } catch (error) {}
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
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
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => this.setState({ mood: 0 })}
            >
              <Icon
                name="sentiment-very-dissatisfied"
                color={this.state.mood === 0 ? decodedMoodColours[this.state.mood] : "#0000008A"}
                size={50}
                style={styles.emoji}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ mood: 1 })}
            >
              <Icon
                name="sentiment-dissatisfied"
                color={this.state.mood === 1 ? decodedMoodColours[this.state.mood] : "#0000008A"}
                size={50}
                style={styles.emoji}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ mood: 2 })}
            >
              <Icon
                name="sentiment-neutral"
                color={this.state.mood === 2 ? decodedMoodColours[this.state.mood] : "#0000008A"}
                size={50}
                style={styles.emoji}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ mood: 3 })}
            >
              <Icon
                name="sentiment-satisfied"
                color={this.state.mood === 3 ? decodedMoodColours[this.state.mood] : "#0000008A"}
                size={50}
                style={styles.emoji}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ mood: 4 })}
            >
              <Icon
                name="sentiment-very-satisfied"
                color={this.state.mood === 4 ? decodedMoodColours[this.state.mood] : "#0000008A"}
                size={50}
                style={styles.emoji}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={[styles.h1, {color: decodedMoodColours[this.state.mood]}]}>{decodedMoodPhrase[this.state.mood]}</Text>

          <View>
            <Button
              title={"  " + this.state.date.toLocaleDateString() + " ▼"}
              onPress={this.showDatepicker}
              type="clear"
            ></Button>
            <Text style={{ textAlign: "center" }}>
              {days[this.state.date.getDay()]}
            </Text>

            {this.state.show && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={this.state.date}
                mode={this.state.mode}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />
            )}
          </View>

          <TextInput
            multiline
            editable
            onChangeText={(text) => this.handleTextChange(text)}
            value={this.state.text}
            style={styles.input}
            placeholder="Write your journal here"
            numberOfLines={6}
            maxLength={400}
          ></TextInput>

          <Button
            title="Save"
            onPress={this.storeData}
            type="clear"
            style={{ marginTop: 100 }}
          ></Button>
        </View>
      </KeyboardAvoidingView>
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
    textAlign: "center",
  },
  emoji: {},
  input: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    textAlign: "justify",
    fontFamily: "sans-serif-light",
    fontSize: 16,
  },
});

export default AddScreen;
