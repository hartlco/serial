'use-strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicator,
    Image,
    ListView
} from 'react-native';

var ShowList = require('./ShowList.js');

class SearchResultsPage extends Component {

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.guid !== r2.guid}
        );
        this.state = {
            isLoading: true,
            dataSource: dataSource.cloneWithRows(this.props.results)
        };
    }

    render() {
        return(
            <ShowList dataSource={this.state.dataSource} onPressBlock={this.props.addShowBlock} automaticallyAdjustContentInsets={true}/>
        );
    }
}

var styles = StyleSheet.create({
    
});

module.exports = SearchResultsPage;