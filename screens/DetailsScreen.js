import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { AsyncStorage } from 'react-native';

const decodedMoodEmoticons = ['sentiment-very-dissatisfied', 'sentiment-dissatisfied', 'sentiment-neutral', 'sentiment-satisfied', 'sentiment-very-satisfied', 'test']
const decodedMoodPhrase = ['Depressed', 'Dissatisfied', 'Mediocre', 'Satisfied', 'Delighted', 'test']
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class DetailsScreen extends React.Component {
    state = {
        entryObj: null
    }

    retrieveData = async (date) => {
        try {
            const values = await AsyncStorage.getItem(date)
            const obj = JSON.parse(values)

            // parse string to obj
            this.setState({ entryObj: { ...obj, date: date } })
            console.log(values)

        } catch (error) {
            console.log('   fail:', error);
            // Error retrieving data
        }
    };

    componentDidMount() {
        // When mounted, get data based on date, and set a listener to update the date whenever the screen gets back into focus (i.e. returns from edit)
        this._updater = this.props.navigation.addListener('focus', () => {
            this.retrieveData(this.props.route.params.date)
            console.log('Update')
        });
    }

    render() {
        if (this.state.entryObj) {
            const entryObj = this.state.entryObj
            return (
                <View style={styles.container}>
                    <Icon
                        name={decodedMoodEmoticons[entryObj.mood]}
                        color='#0000008A'
                        size={120}
                        style={{ paddingTop: 40 }}
                    />
                    <View style={{ paddingHorizontal: 15, }}>
                        <Text style={[styles.h1, {}]}>{decodedMoodPhrase[entryObj.mood]}</Text>
                        <Text style={[styles.text, { fontWeight: "700" }]}>{entryObj.date.slice(4)}</Text>
                        <Text style={[styles.text, {}]}>{days[new Date(entryObj.date).getDay()]}</Text>

                        {entryObj.videoJournal ? <Text style={[styles.journalText]}>{entryObj.videoJournal}</Text>
                            : entryObj.writtenJournal ? <Text style={[styles.journalText]}>{entryObj.writtenJournal}</Text>
                                : <Text style={[styles.journalText]}>Edit to Add Journal</Text>}

                    </View>
                    <Button title="Edit" type="clear" onPress={() => this.props.navigation.navigate('Adder', { ...entryObj, onBack: () => this.refresh() })}></Button>
                </View>
            );
        } else {
            return null
        }
    }
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