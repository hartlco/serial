'use-strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicator,
    Image
} from 'react-native';

var SearchResultsPage = require('./SearchResultsPage')

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    render() {
        return(
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(searchText) => this.setState({searchText})}
                    value={this.state.searchText}
                    placeholder='Search new shows'
                    returnKeyType = {"go"}
                    onSubmitEditing = {(event) => {
                        this._onReturn();
                    }}
                    clearTextOnFocus = {true}
                />
            </View>
        );
    }

    _onReturn() {
        this.props.navigator.push({
            title: 'Search results',
            component: SearchResultsPage,
            passProps: {searchText: this.state.searchText}
        });
    }
}

var styles = StyleSheet.create({
    textInputContainer: {
        padding: 0,
        marginTop: 65,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    textInput: {
        height: 40, 
        padding:10,
        margin:10,
        backgroundColor: 'white',
        borderRadius: 5
    },

});

module.exports = MainPage;