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

class ShowList extends Component {

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight 
                onPress={this.props.onPressBlock.bind(this, rowData)}
                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source= {{ uri: rowData.show.image.medium }} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{rowData.show.name}</Text>
                            <Text style={styles.summary} numberOfLines={5}>{rowData.show.summary}</Text>
                        </View>
                    </View>
                    <View style={styles.sparator}/>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return(
            <ListView 
                dataSource={this.props.dataSource} 
                renderRow={this.renderRow.bind(this)}
                automaticallyAdjustContentInsets={this.props.automaticallyAdjustContentInsets}
            />
        );
    }
}

var styles = StyleSheet.create({
    thumb: {
        width:100,
        padding:10,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    sparator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    summary: {
        fontSize: 14,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
});

module.exports = ShowList;