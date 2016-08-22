/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';

var MainPage = require('./MainPage');

class serial extends Component {
  render() {
        return(
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: 'Serial',
                    component: MainPage,
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('serial', () => serial);
