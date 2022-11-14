/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Navigation from './src/navigation';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';

Amplify.configure(config);

import {
  SafeAreaView, 
  StyleSheet,
  Text,
 
} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';



const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <RootNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  }
});

export default App;
