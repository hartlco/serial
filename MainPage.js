'use-strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    ListView,
    AsyncStorage,
    StatusBar
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
            loading: false,
            resultMessage: null,
        };
        this._loadData();
    }

     render() {

        var spinner = this.state.loading ? (<ActivityIndicator style={styles.activityIndicator} size='large'/>) : (<View/>); 
        var resultsText = this.state.resultMessage ? (<Text style={styles.resultText}>{this.state.resultMessage}</Text>) : (<View/>);

        return(
            <View style={{flex: 1, backgroundColor:'#1C2F40'}}>
                <StatusBar barStyle="light-content"/>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(searchText) => this.setState({searchText})}
                        value={this.state.searchText}
                        placeholder='Search new shows'
                        returnKeyType = {"go"}
                        onSubmitEditing = {this._onReturn.bind(this)}
                        clearTextOnFocus = {true}
                        placeholderTextColor='#BBC3C9'
                        selectionColor='#14F5A5'
                        keyboardAppearance='dark'
                    />
                </View>
                {spinner}
                {resultsText}
                <View style={styles.listContainer}>
                    <ShowList dataSource={this.state.dataSource} onPressBlock={this._onPress.bind(this)} automaticallyAdjustContentInsets={true}/>
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
        this.setState({
            loading:true,
            resultMessage:''
        });
        var query = this._queryURLForSearchTerm(searchTerm);
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json))
            .catch(error =>
                console.log(error)  
            );
    }

    _handleResponse(response) {
        this.setState({ loading:false }); 

        if (response === null || response.length === 0) {
            this.setState({ resultMessage: "No shows for the search term" }); 
            return;
        }

        this.setState({ resultMessage: null});

        var self = this;
        var addShow = function(props) {

            if (self.state.storage.includes(props))  {
                return;
            }

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
        console.log(rowData);
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
            title: rowData.show.name,
            component: DetailPage,
            passProps: {
                detailData: rowData,
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
        alignItems: 'center',
        backgroundColor: '#1C2F40',
    },
    resultText: {
        color:'#ffffff',
        alignItems:'center',
        padding:10,
        textAlign: 'center',
    },
    textInput: {
        height: 40, 
        padding:10,
        margin:10,
        backgroundColor: '#516676',
        borderRadius: 5,
        color:'#ffffff',
    },
    listContainer: {
        flex:1,
    },
    activityIndicator: {
        padding:10,
    },

});

module.exports = MainPage;