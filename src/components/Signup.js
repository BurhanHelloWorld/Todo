import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';


const Signup = ({ navigation }) => {

    const Go = () => {
        navigation.navigate('Login')
    }

    const [name, setName] = useState("");
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");

    const Check = () => {
        if (name && uname && email && pass && cpass) {
            if (pass == cpass) {
                StoreData()
            } else {
                Snackbar.show({
                    text: 'Password must be same'
                })
            }
        }
        else {
            Snackbar.show({
                text: 'Check your fields'
            })
        }
    }

    const StoreData = async () => {

        try {
            const D = await auth().createUserWithEmailAndPassword(email, pass);
            console.log(D)
            console.log('email======>', email, 'pass======>', pass)
            
            Snackbar.show({
                text: 'Accunt registered successfully',
                duration: Snackbar.LENGTH_SHORT
            })
            setEmail(""),
                setPass(""),
                setName(""),
                setUname(""),
                setPass(""),
                setCpass("")
        } catch (error) {

            if (error.code === 'auth/invalid-email') {
                Alert.alert('Invalid', 'Email address is invalid')
            }
            else if (error.code === 'auth/email-already-in-use') {
                Alert.alert('already use', "That email already is in use")
            }
            else if (error.code === 'auth/weak-password') {
                Alert.alert('WeakPassword', 'Password should be at least 6 characters')
            }
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center', marginTop: 25, fontWeight: 'bold', color: 'darkgreen', fontSize: 25 }}>Join Us</Text>
            <View style={styles.container1}>
                <TextInput style={styles.input}
                    placeholder='Name'
                    value={name}
                    onChangeText={(txt) => setName(txt)}
                />
                <TextInput style={styles.input}
                    placeholder='Username'
                    value={uname}
                    onChangeText={(txt) => setUname(txt)}
                />
                <TextInput style={styles.input}
                    placeholder='EmailAddress'
                    value={email}
                    onChangeText={(txt) => setEmail(txt)}
                />
                <TextInput style={styles.input}
                    placeholder='*******'
                    secureTextEntry={true}
                    value={pass}
                    onChangeText={(txt) => setPass(txt)}
                />
                <TextInput style={styles.input}
                    placeholder='*******'
                    secureTextEntry={true}
                    value={cpass}
                    onChangeText={(txt) => setCpass(txt)}
                />
                <TouchableOpacity onPress={() => Check()}
                    style={styles.btn}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Signup</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Text>already have an account? </Text>
                    <TouchableOpacity onPress={() => Go()}>
                        <Text style={{ fontWeight: 'bold', color: 'darkgreen', paddingHorizontal: 5 }}>Signin</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
            </View>
        </View>
    )
}

export default Signup

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
        // marginBottom: 40
        // backgroundColor:'green'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '70%',
        height: 40,
        paddingHorizontal: 5,
        elevation: 10,
        marginVertical: 8
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