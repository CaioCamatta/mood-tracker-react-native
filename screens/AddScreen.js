import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Button, Platform } from 'react-native';
import { Icon } from 'react-native-elements'
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';

class AddScreen extends React.Component {
  state = {
    moodSelected: 5
  }

  render() {
    const decodedMoodPhrase = ['Depressed', 'Dissatisfied', 'Mediocre', 'Satisfied', 'Delighted']
    return (
      <View style={styles.container}>
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'center'}}>
          <TouchableWithoutFeedback onPress={() => this.setState({moodSelected: 0})}>
            <Icon name='sentiment-very-dissatisfied' color={(this.state.moodSelected === 0) ? '#000' :'#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({moodSelected: 1})}>
            <Icon name='sentiment-dissatisfied' color={(this.state.moodSelected === 1) ? '#000' :'#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({moodSelected: 2})}>
            <Icon name='sentiment-neutral' color={(this.state.moodSelected === 2) ? '#000' :'#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({moodSelected: 3})}>
            <Icon name='sentiment-satisfied' color={(this.state.moodSelected === 3) ? '#000' :'#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({moodSelected: 4})}>
            <Icon name='sentiment-very-satisfied' color={(this.state.moodSelected === 4) ? '#000' :'#0000008A'} size={50} style={styles.emoji} />
          </TouchableWithoutFeedback>

        </View>
        <Text style={styles.h1}>{decodedMoodPhrase[this.state.moodSelected]}</Text>
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
  },
  emoji:{
    paddingTop: 45,
  }
});

export default AddScreen