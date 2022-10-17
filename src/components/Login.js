import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';


const Login = ({ navigation }) => {

  const Go = () => {
    navigation.navigate('Signup')
  }

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const Enter = async () => {
    try {
      if (email && pass) {
        const D = await auth().signInWithEmailAndPassword(email, pass)
        // console.log(D)
        navigation.replace('Home')
      } else {
        Snackbar.show({
          text: 'Check your fields'
        })
      }
    } catch (error) {

      if (error.code === 'auth/user-not-found') {
        Snackbar.show({
          text:'No user found'
        })
      }
      else if (error.code === 'auth/wrong-password') {
        Snackbar.show({
          text:'Password is incorrect'
        })
      }
      else if (error.code === 'auth/invalid-email') {
        Snackbar.show({
          text:"Email address is invalid"
        })
      }
      console.error(error);

    }
  }


  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', marginTop: 25, fontSize: 25, fontWeight: 'bold', color: 'darkgreen' }}>Welcome to TODO</Text>
      <View style={styles.container1}>
        <TextInput style={styles.input}
          placeholder='Enter Username'
          value={email}
          onChangeText={(txt) => setEmail(txt)}
        />
        <TextInput style={styles.input}
          placeholder='Enter your Pass'
          secureTextEntry={true}
          value={pass}
          onChangeText={(txt) => setPass(txt)}
        />
        <TouchableOpacity onPress={() => Enter()}
          style={styles.btn}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Signin</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{color:'black'}}>Dont have an account? </Text>
          <TouchableOpacity onPress={() => Go()}>
            <Text style={{ fontWeight: 'bold', color: 'darkgreen', paddingHorizontal: 5 }}>Create</Text>
          </TouchableOpacity>
        </View>

      </View>
      <View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  container1: {
    flex: 0.9,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '70%',
    height: 40,
    paddingHorizontal: 5,
    elevation: 10,
    marginVertical: 8,
  },
  btn: {
    width: '60%',
    backgroundColor: 'darkgreen',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12
  }



})