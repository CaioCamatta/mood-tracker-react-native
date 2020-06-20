import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Entry from "../components/Entry";
import Constants from "expo-constants";
import { Icon, Button } from "react-native-elements";
import {connect} from 'react-redux'

class HomeScreen extends React.Component {
  renderEntries = ({ item, navigation }) => (
    <Entry {...item} date={item.date} navigation={this.props.navigation} />
  );

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
            data={this.props.entries}
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

const mapStateToProps = state => ({
  entries: state.entries,
})

export default connect(mapStateToProps)(HomeScreen)
