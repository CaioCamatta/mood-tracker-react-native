import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Platform, AsyncStorage, TextInput } from 'react-native';
import { Icon } from 'react-native-elements'
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const decodedMoodPhrase = ['Depressed', 'Dissatisfied', 'Mediocre', 'Satisfied', 'Delighted', 'Mood']
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class AddScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mood: 5,
      date: new Date(),
      mode: 'date',
      show: false,
      writtenJournal: '',
    }
  }

  componentDidMount(){
    // If pre-populating data is passed
    if(this.props.route.params){
      this.setState({
        ...this.props.route.params,
        date: new Date(this.props.route.params.date),
      })
    }
  }

  handleTextChange = writtenJournal => {
    this.setState({ writtenJournal })
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({ show: Platform.OS === 'ios' })
    this.setState({ date: currentDate });
  };

  showMode = currentMode => {
    this.setState({ show: true, mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  storeData = async () => {
    try {

      // Write object before storing
      const entryObj = this.state.writtenJournal ? { mood: this.state.mood, status: 'Journal Added', writtenJournal: this.state.text} : { mood: this.state.mood, status: 'No Journal Added', writtenJournal: ''}

      await AsyncStorage.setItem(
        this.state.date.toDateString(),
        JSON.stringify(entryObj)
      ).then(() => {
        console.log('data saved');
        this.props.navigation.goBack();
      })
    } catch (error) {

    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableWithoutFeedback onPress={() => this.setState({ mood: 0 })}>
            <Icon name='sentiment-very-dissatisfied' color={(this.state.mood === 0) ? '#000' : '#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({ mood: 1 })}>
            <Icon name='sentiment-dissatisfied' color={(this.state.mood === 1) ? '#000' : '#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({ mood: 2 })}>
            <Icon name='sentiment-neutral' color={(this.state.mood === 2) ? '#000' : '#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({ mood: 3 })}>
            <Icon name='sentiment-satisfied' color={(this.state.mood === 3) ? '#000' : '#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({ mood: 4 })}>
            <Icon name='sentiment-very-satisfied' color={(this.state.mood === 4) ? '#000' : '#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>

        </View>
        <Text style={styles.h1}>{decodedMoodPhrase[this.state.mood]}</Text>

        <View>
          <Button title={this.state.date.toLocaleDateString()} onPress={this.showDatepicker} type="clear"></Button>
          <Text style={{ textAlign: 'center' }}>{days[this.state.date.getDay()]}</Text>

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
          numberOfLines={4}
          editable
          onChangeText={text => this.handleTextChange(text)}
          value={this.state.text}
          style={styles.input}
        ></TextInput>

        <Button title='Save' onPress={this.storeData} type="clear" style={{ marginTop: 100 }}></Button>
      </View>
    );
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
    padding: 20,
    paddingBottom: 10,
  },
  emoji: {
    paddingTop: 45,
  },
  input:{
    paddingHorizontal: 30,
    paddingVertical: 20,
    textAlign: 'justify',
    fontFamily: 'sans-serif-light',
    fontSize: 16,

  }
});

export default AddScreen