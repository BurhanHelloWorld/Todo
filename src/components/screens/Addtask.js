import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import database from '@react-native-firebase/database';


const Addtask = () => {

const [task, setTask] = useState("")
const [date, setDate] = useState("")

  return (
    <View style={{flex:1}}>
      <Text style={styles.Maintext}>New Task</Text>
      <View style={styles.container1}>
      <Text style={{fontWeight:'bold',color:'lightgreen',marginTop:10}}>What is to be done?</Text>
      <TextInput style={styles.input}
      placeholder='Enter Task Here'
      value={task}
      onChangeText={(txt)=>setTask(txt)}
      />
      <Text style={{fontWeight:'bold',color:'lightgreen',marginTop:10}}>Due Date</Text>
      <TextInput style={styles.input}
      placeholder='Date not set'
      value={date}
      onChangeText={(txt)=>setDate(txt)}
      />
      </View>
      <View style={{flex:0.2,backgroundColor:"darkgreen",justifyContent:'flex-end',alignItems:'flex-end',marginBottom:5}}>
      <TouchableOpacity style={styles.btn}>
          <MaterialIcons name='check' style={{ fontSize: 40, color: 'darkgreen' }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Addtask

const styles = StyleSheet.create({
  container1:{
    flex:1,
    backgroundColor:'darkgreen',
    marginTop:5,
    alignItems:'center'
  },
  Maintext: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: 'darkgreen'
  },
  input:{
    padding: 10,
    height:40,
    color: 'white', 
    margin: 10,
    borderBottomWidth:2,
    borderBottomColor: 'white',
    width: '80%'
  },
  btn: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 50,
    marginBottom: 10
  },

})