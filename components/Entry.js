import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import PropTypes from "prop-types"
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const decodedMoods = ['test', 'sentiment-very-dissatisfied', 'sentiment-dissatisfied', 'sentiment-neutral', 'sentiment-satisfied', 'sentiment-very-satisfied']

const Entry = (props) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Details')}>
            <Icon
                name={decodedMoods[props.mood]}
                color='#0000008A'
                size={50}
                style={{paddingLeft: 15}}
            />
            <View style={{paddingHorizontal: 15,}}>
                <Text style={[{fontSize: 15, fontWeight: "700"}, styles.text]}>{props.date}</Text>
                <Text style={[{fontSize: 14}, styles.text]}>{props.status}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#DCDCDC',
        marginHorizontal: 40,
        paddingVertical: 8,
        borderRadius: 20,
        marginVertical: 10,
    },
    text:{
        color: "#656565"
    }
});

Entry.propTypes = {
    mood: PropTypes.number,
    date: PropTypes.string,
    description: PropTypes.string,
}

Entry.defaultProps = {
    mood: 3,
    date: 'Test Apr 1 2020',
    description: `Video Added`,
}


export default Entry 