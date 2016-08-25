'use-strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    TouchableHighlight,
} from 'react-native';

class DetailPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.button} 
                    onPress={this._onPressButton}
                    underlayColor='#99d9f4'
                    onPress={this.onDeletePress.bind(this)}>
                    <Text>Delete</Text>
                </TouchableHighlight>
            </View>
        );
    }

    onDeletePress() {
        this.props.deleteShowBlock();
        this.props.navigator.pop();
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop: 64,
        flex:1,
    },
    button: {
        height: 36,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});

module.exports = DetailPage;