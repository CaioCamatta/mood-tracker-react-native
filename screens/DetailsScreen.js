import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

const DetailsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Details!</Text>
        </View>
    );
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

export default DetailsScreen