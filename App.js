import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackView from './src/navigation/StackView';
import NetInfo from "@react-native-community/netinfo";
import Snackbar from 'react-native-snackbar';

const App = () => {

  const [internet, setInternet] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if (state.isConnected == false) {
        setInternet(false)
      } else {
        setInternet(true)
      }
    });
    return () => {
      unsubscribe()
    }
  }, [internet])


  return (
    <>
      {
        internet ?
          <NavigationContainer>
            <StackView />
          </NavigationContainer> :
          Snackbar.show({ text: 'check your internet connection' })
      }
    </>
  )
}

export default App

const styles = StyleSheet.create({})