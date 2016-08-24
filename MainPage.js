'use-strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    ListView
} from 'react-native';

var ShowList = require('./ShowList.js');

var SearchResultsPage = require('./SearchResultsPage')

class MainPage extends Component {

    static dataSource() {
        return new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    }

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            storage: [],
            dataSource: MainPage.dataSource().cloneWithRows([]),
        };
    }

     render() {
        return(
            <View style={{flex: 1}}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(searchText) => this.setState({searchText})}
                        value={this.state.searchText}
                        placeholder='Search new shows'
                        returnKeyType = {"go"}
                        onSubmitEditing = {this._onReturn.bind(this)}
                        clearTextOnFocus = {true}
                    />
                </View>
                <ShowList dataSource={this.state.dataSource} onPressBlock={this._onPress.bind()} automaticallyAdjustContentInsets={false}/>
                <View style={styles.listContainer}>
            </View>
            </View>
        );
    }

    _queryURLForSearchTerm(seachTerm) {
        return 'http://api.tvmaze.com/search/shows?q=' + seachTerm;
    }

    _executeQueryForSearchTerm(searchTerm) {
        var query = this._queryURLForSearchTerm(searchTerm);
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json))
            .catch(error =>
                console.log(error)  
            );
    }

    _handleResponse(response) {
        var self = this;
        var addShow = function(props) {
            self.state.storage.push(props)
            self.setState({
                dataSource: MainPage.dataSource().cloneWithRows(self.state.storage)
            })
        }
        
        this.props.navigator.push({
            title: 'Search results',
            component: SearchResultsPage,
            passProps: {results: response, addShowBlock: addShow}
        });
    }

    _onPress() {

    }

    _onReturn() {
        this._executeQueryForSearchTerm(this.state.searchText);
    }
}

var styles = StyleSheet.create({
    textInputContainer: {
        marginTop: 64,
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
    listContainer: {
        flex:1,
    }

});

module.exports = MainPage;