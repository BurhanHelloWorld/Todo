import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Login from '../components/Login';
import Signup from '../components/Signup';
import Home from '../components/Home';
import Addtask from '../components/screens/Addtask';

const Stack = createNativeStackNavigator();

const StackView = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
            <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}} />
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
            <Stack.Screen name="Addtask" component={Addtask} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}

export default StackView

const styles = StyleSheet.create({})