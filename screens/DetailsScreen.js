import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';

const decodedMoodEmoticons = ['test', 'sentiment-very-dissatisfied', 'sentiment-dissatisfied', 'sentiment-neutral', 'sentiment-satisfied', 'sentiment-very-satisfied']
const decodedMoodPhrase = ['test', 'Depressed', 'Dissatisfied', 'Mediocre', 'Satisfied', 'Delighted']
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const DetailsScreen = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <Icon
                name={decodedMoodEmoticons[route.params.mood]}
                color='#0000008A'
                size={120}
                style={{paddingTop: 40}}
            />
            <View style={{paddingHorizontal: 15,}}>
                <Text style={[styles.h1, {}]}>{decodedMoodPhrase[route.params.mood]}</Text>
                <Text style={[styles.text, {fontWeight: "700"}]}>{route.params.date.toLocaleDateString('en-GB')}</Text>
                <Text style={[styles.text, {}]}>{days[route.params.date.getDay()]}</Text>
                {route.params.videoJournal ? <Text style={[styles.journalText]}>{route.params.videoJournal}</Text>
                : route.params.writtenJournal ? <Text style={[styles.journalText]}>{route.params.writtenJournal}</Text>
                :<Text style={[styles.journalText]}>Add Journal</Text>}
            </View>
            <Button title="Edit" type="clear"></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
    },
    h1: {
        fontSize: 30,
        fontSize: 42, 
        fontWeight: "400", 
        paddingTop: 10,
        paddingBottom: 12,
        fontFamily: 'sans-serif-light',
        color: '#454545'
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Roboto',
        color: '#656565',
    },
    journalText: {
        textAlign: 'center',
        margin: 40,
    }
});

export default DetailsScreen