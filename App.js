import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackView from './src/navigation/StackView';
import Home from './src/components/Home';
import Login from './src/components/Login';

const App = () => {
  return (
    // <NavigationContainer>
    //   <StackView/>
    // </NavigationContainer>
    <Home/>
    // <Login/>
  )
}

export default App

const styles = StyleSheet.create({})