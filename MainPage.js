'use-strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    ListView,
    AsyncStorage
} from 'react-native';

var ShowList = require('./ShowList.js');
var SearchResultsPage = require('./SearchResultsPage');
var DetailPage = require('./DetailPage.js');

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
        this._loadData();
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
                <View style={styles.listContainer}>
                    <ShowList dataSource={this.state.dataSource} onPressBlock={this._onPress.bind(this)} automaticallyAdjustContentInsets={false}/>
                </View>
            </View>
        );
    }

    async _loadData() {
        var storage;
        try {
            const value = await AsyncStorage.getItem('Storage');
            if (value !== null) {
                console.log("storage: " + value);
                storage = JSON.parse(value);
                var self = this;
                self.setState({
                    storage: storage,
                    dataSource: MainPage.dataSource().cloneWithRows(storage)
                });
            }
        } catch (error) {
            console.log("error " + error);
        }
    }

    async _saveData() {
        try {
            await AsyncStorage.setItem('Storage', JSON.stringify(this.state.storage));
        } catch (error) {
            console.log("Saveerror: " + error);
        }
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
            self._saveData();
        }
        
        this.props.navigator.push({
            title: 'Search results',
            component: SearchResultsPage,
            passProps: {results: response, addShowBlock: addShow}
        });
    }

    _onPress(rowData) {
        var self = this;
        var deleteShow = function() {
            var storage = self.state.storage;
            self.state.storage.splice(storage.indexOf(rowData), 1);
            self.setState({
                dataSource: MainPage.dataSource().cloneWithRows(self.state.storage)
            })
            self._saveData();
        }

        this.props.navigator.push({
            title: 'Detail',
            component: DetailPage,
            passProps: {
                show: rowData,
                deleteShowBlock: deleteShow
            }
        });
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