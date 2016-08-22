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

class SearchResultsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            results: []
        };

        this._executeQueryForSearchTerm(this.props.searchText);
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
        this.setState( { results: response , isLoading: false} );   
    }

    render() {
        console.log(this.state.isLoading);
        var spinner = this.state.isLoading ? ( <ActivityIndicator size='large'/> ) :(<View/>);
        var firstObject = this.state.results[0];
        console.log(firstObject);
        var text = this.state.results ? (<Text style={styles.textInput}>Got something</Text>) : (<View/>);

        return(
            <View>
                <View style={styles.spinnerContainer}>
                    {spinner}
                </View>
                {text}
            </View>
        );
    }


}

var styles = StyleSheet.create({
    spinnerContainer: {
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
    },

});

module.exports = SearchResultsPage;