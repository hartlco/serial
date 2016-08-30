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
            dataSource: dataSource.cloneWithRows(this.props.results),
            showAddMessage: false,
        };
    }

    render() {

        var addMessage = this.state.showAddMessage ? (<Text style={styles.addMessage}>Added item</Text>) : (<View/>);

        return(
            <View style={{flex: 1, backgroundColor:'#1C2F40'}}>
                <ShowList dataSource={this.state.dataSource} onPressBlock={this._onPress.bind(this)} automaticallyAdjustContentInsets={true}/>
                {addMessage}
            </View>
        );
    }

    _onPress(rowData) {
        this.setState({showAddMessage:true});

        setTimeout( () => {
            this.setState({showAddMessage:false});
        }, 2000);

        this.props.addShowBlock(rowData);
    }
}

var styles = StyleSheet.create({
    addMessage: {
        position: 'absolute',
        alignItems:'center',
        padding:10,
        textAlign: 'center',
        backgroundColor: '#14F5A5',
        top:0,
        left:0,
        right:0,
    },
});

module.exports = SearchResultsPage;