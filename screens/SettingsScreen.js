import React from "react";
import { Icon } from "react-native-elements";
import { Button } from "react-native-elements";
import { Text, View, Vibration, Platform, StyleSheet } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import moment from "moment";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

class SettingsScreen extends React.Component {
  state = {
    expoPushToken: "",
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = (notification) => {
    Vibration.vibrate();
    console.log("Received");
    console.log(notification);
    this.props.navigation.navigate("Adder")
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  // Get next 9 pm date obj (or other time)
  scheduleHour = (timeString) => {
    let nextTime = moment(timeString, "h:mm p");
    nextTime < new Date() ? nextTime.add(1, "day") : null;
    return nextTime.toDate();
  };

  scheduleNotifications = async () => {
    let notificationObj = {
      to: this.state.expoPushToken,
      sound: "default",
      title: "Journal Time",
      body: "Add your journal for today!",
      _displayInForeground: true,
    };

    let schedulingOptions = {
      time: this.scheduleHour("21:00"),
      repeat: "minute",
    };

    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleLocalNotificationAsync(
      notificationObj,
      schedulingOptions
    );
    console.log("Notifications Rescheduled");

    showMessage({
      message: "Notifications Scheduled!",
      type: "success",
    });
  };

  cancelScheduledNotifications = async () => {
    Notifications.cancelAllScheduledNotificationsAsync();
    showMessage({
      message: "Notifications Cancelled",
      type: "info",
    });
  };

  render() {
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
            alignItems: "flex-start",
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.h1}>Settings</Text>
          <Button
            title="Re-schedule 9 pm notifications"
            onPress={this.scheduleNotifications}
            type="clear"
          />
          <Button
            title="Cancel all notifications"
            onPress={this.cancelScheduledNotifications}
            type="clear"
          />
        </View>
        <FlashMessage position="top" />
      </View>
    );
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
    padding: 10,
  },
});

export default SettingsScreen;
