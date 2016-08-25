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
  Navigator,
} from 'react-native';

var MainPage = require('./MainPage');

class serial extends Component {
  render() {
        return(
            <Navigator
                style={styles.container}
                initialRoute={{
                    title: 'Serial',
                    component: MainPage,
                }}
                renderScene={(route, navigator) =>
                    <Text>Hello {route.title}!</Text>
                }
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