import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import database from '@react-native-firebase/database';
import DatePicker from 'react-native-date-picker'
import auth from '@react-native-firebase/auth';



const Addtask = () => {

  const [task, setTask] = useState("")
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const store = async() => {
try {
  if (task){
  // const s = await database().ref(`tasks`).child(auth().currentUser.uid).push()
  // .set({task:task, date:`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`})
  const s = await database().ref(`tasks`).child(auth().currentUser.uid).push()
  .set({task:task, date: JSON.stringify(date)})
  console.log(s)
  } else {
    Alert.alert('Empty', 'Please Enter your task')
  }
} catch (err) {
  console.log(err)
}
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.Maintext}>New Task</Text>
      <View style={styles.container1}>
        <Text style={{ fontWeight: 'bold', color: 'lightgreen', marginTop: 10 }}>What is to be done?</Text>
        <TextInput style={styles.input}
          placeholder='Enter Task Here'
          value={task}
          onChangeText={(txt) => setTask(txt)}
          multiline
        />

        <Text style={{ fontWeight: 'bold', color: 'lightgreen', marginTop: 10 }}>Due Date</Text>
        <TextInput style={styles.input}
          placeholder='Date not set'
          value={JSON.stringify(`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`)}
          // onChangeText={() => setDate()}
          onPressIn={() => setOpen(true)}
          
        />

        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
            console.log("dateeee=======>", date)
          }}
          mode="date"
          onCancel={() => {
            setOpen(false)
          }}
        />
        <Text>{JSON.stringify(date)}</Text>

      </View>
      <View style={{ flex: 0.2, backgroundColor: "darkgreen", justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 5 }}>
        <TouchableOpacity onPress={()=>store()} style={styles.btn}>
          <MaterialIcons name='check' style={{ fontSize: 40, color: 'darkgreen' }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Addtask

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'darkgreen',
    marginTop: 5,
    alignItems: 'center'
  },
  Maintext: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: 'darkgreen'
  },
  input: {
    padding: 10,
    color: 'white',
    margin: 10,
    borderBottomWidth: 2,
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