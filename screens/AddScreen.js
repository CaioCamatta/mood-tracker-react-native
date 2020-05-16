import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Platform } from 'react-native';
import { Icon } from 'react-native-elements'
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements';

const decodedMoodPhrase = ['Depressed', 'Dissatisfied', 'Mediocre', 'Satisfied', 'Delighted']
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

class AddScreen extends React.Component {
  state = {
    moodSelected: 5,
    date: new Date(),
    mode: 'date',
    show: false,
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
      console.log(this.state.date.toDateString())
      await AsyncStorage.setItem(
        this.state.date.toDateString(),
        JSON.stringify({mood: this.state.moodSelected, status: 'Video Added'})
      ).then(()=>{
        console.log('data saved');
        })
    } catch (error) {
      
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableWithoutFeedback onPress={() => this.setState({ moodSelected: 0 })}>
            <Icon name='sentiment-very-dissatisfied' color={(this.state.moodSelected === 0) ? '#000' : '#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({ moodSelected: 1 })}>
            <Icon name='sentiment-dissatisfied' color={(this.state.moodSelected === 1) ? '#000' : '#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({ moodSelected: 2 })}>
            <Icon name='sentiment-neutral' color={(this.state.moodSelected === 2) ? '#000' : '#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({ moodSelected: 3 })}>
            <Icon name='sentiment-satisfied' color={(this.state.moodSelected === 3) ? '#000' : '#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({ moodSelected: 4 })}>
            <Icon name='sentiment-very-satisfied' color={(this.state.moodSelected === 4) ? '#000' : '#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>

        </View>
        <Text style={styles.h1}>{decodedMoodPhrase[this.state.moodSelected]}</Text>

        <View>
          <Button title={this.state.date.toLocaleDateString()} onPress={this.showDatepicker} type="clear"></Button>
          <Text style={{textAlign: 'center'}}>{days[this.state.date.getDay()]}</Text>

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
      
        <Button title='Save' onPress={this.storeData} type="clear" style={{marginTop: 100}}></Button>
        <Button title='Retrieve' onPress={this.retrieveData} type="clear" style={{marginTop: 100}}></Button>
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
  }
});

export default AddScreen