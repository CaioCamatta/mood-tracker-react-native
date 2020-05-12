import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Entry from '../components/Entry'
import Constants from 'expo-constants';

const sample_entries = [
    { date: new Date("2020-07-25"), status: 'Video Added', mood: 4 },
    { date: new Date("2020-07-24"), status: 'Video Added', mood: 1 },
    { date: new Date("2020-07-23"), status: 'Video Added', mood: 2 },
    { date: new Date("2020-07-22"), status: 'Video Added', mood: 3 },
    { date: new Date("2020-07-21"), status: 'Video Added', mood: 4 },
    { date: new Date("2020-07-20"), status: 'Video Added', mood: 5 },
    { date: new Date("2020-07-19"), status: 'Video Added', mood: 1 },
    { date: new Date("2020-07-18"), status: 'Video Added', mood: 2 },
    { date: new Date("2020-07-17"), status: 'Video Added', mood: 3 },
]

export default class HomeScreen extends React.Component {
    state = {
        entries: sample_entries,
    }

    renderEntries = ({ item, navigation }) => <Entry {...item} date={item.date.toDateString()} navigation={this.props.navigation} />

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.h1}>Entries</Text>
                <View>
                    <FlatList
                        renderItem={this.renderEntries}
                        data={this.state.entries.sort((a, b) => b.date - a.date)}
                        style={{ marginBottom: 85 }}
                        keyExtractor={item => item.date.toString()}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
    },
    h1: {
        fontSize: 30,
        padding: 20,
        paddingBottom: 10,
    }
});
