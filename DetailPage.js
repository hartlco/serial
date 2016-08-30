'use-strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    TouchableHighlight,
    Image,
    ScrollView
} from 'react-native';

class DetailPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        var image = this.props.detailData.show.image !== null ? (<Image resizeMode="contain" style={styles.thumb} source= {{ uri: this.props.detailData.show.image.medium }} />) : (<View/>);
        var summary = this.props.detailData.show.summary.replace(/<(?:.|\n)*?>/gm, '');

        return(
            <ScrollView style={styles.container} contentInset={{bottom: 60}}>
                <View style={styles.rowContainer}>
                    {image}
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{this.props.detailData.show.name}</Text>
                        <Text style={styles.summary}>{summary}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight
                        style={styles.deleteButton}
                        onPress={this._onPressButton}
                        underlayColor='#FF7B45'
                        onPress={this.onDeletePress.bind(this)}>
                        <Text>Delete</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.shareButton} 
                        onPress={this._onPressButton}
                        underlayColor='#14F5A5'
                        onPress={this.onDeletePress.bind(this)}>
                        <Text>Share</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }

    onDeletePress() {
        this.props.deleteShowBlock();
        this.props.navigator.pop();
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#1C2F40',
    },
    deleteButton: {
        padding:10,
        margin:10,
        height: 36,
        flexDirection: 'row',
        backgroundColor: '#FF7B45',
        borderRadius: 6,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex:1,
    },
    shareButton: {
        padding:10,
        margin:10,
        height: 36,
        flexDirection: 'row',
        backgroundColor: '#14F5A5',
        borderRadius: 6,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex:1,
    },
    textContainer: {
        flex: 1,
        padding:10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#14F5A5',
        paddingTop:20,
        paddingBottom:8,
        textAlign:'center',
    },
    summary: {
        fontSize: 14,
        color: '#DFEAF2',
    },
    thumb: {
        height:240,
        padding:20,
    },
    rowContainer: {
        flexDirection: 'column',
        paddingTop: 14,
        paddingBottom:14,
        paddingRight:10,
        paddingLeft:10,
    },
    buttonContainer: {
        flex:1,
        flexDirection: 'row',
        paddingBottom:20,
    }
});

module.exports = DetailPage;