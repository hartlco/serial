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

        var image = rowData.show.image !== null ? (<Image resizeMode="contain" style={styles.thumb} source= {{ uri: rowData.show.image.medium }} />) : (<View/>);
        var summary = rowData.show.summary.replace(/<(?:.|\n)*?>/gm, '');
        return (
            <TouchableHighlight 
                onPress={this.props.onPressBlock.bind(this, rowData)}
                underlayColor='#516676'
                style={styles.cell}>
                <View>
                    <View style={styles.rowContainer}>
                        {image}
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{rowData.show.name}</Text>
                            <Text style={styles.summary} numberOfLines={4}>{summary}</Text>
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
                contentInset={{bottom: 60}}
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
    cell: {
        backgroundColor:'#1C2F40',
    },
    textContainer: {
        flex: 1
    },
    sparator: {
        height: 1,
        backgroundColor: '#000000'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#14F5A5',
        paddingBottom:8
    },
    summary: {
        fontSize: 14,
        color: '#DFEAF2'
    },
    rowContainer: {
        flexDirection: 'row',
        paddingTop: 14,
        paddingBottom:14,
        paddingRight:10,
        paddingLeft:10
    },
});

module.exports = ShowList;