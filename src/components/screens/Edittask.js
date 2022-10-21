import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import database from '@react-native-firebase/database';
import DatePicker from 'react-native-date-picker'
import auth from '@react-native-firebase/auth';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useRoute } from '@react-navigation/native';




const Edittask = () => {

   const route = useRoute()

   const get = route.params.Items
 
   console.log('Paramssss========>>>>>>', JSON.stringify(get))

  const [task, setTask] = useState(get.innerData.task)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)


  const edit = async() => {
try {

await database().ref(`tasks`).child(auth().currentUser.uid).child(`${get.key}`).update(
    {task:task, date: JSON.stringify(date)}
)

} catch (err) {
  console.log(err)
}
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.Maintext}>Edit Task</Text>
      <View style={styles.container1}>
        <Text style={{ fontWeight: 'bold', color: 'lightgreen', marginTop: 10 }}>What is to be done?</Text>
        <TextInput style={styles.input}
          placeholder='Enter Task Here'
          value={task}
          onChangeText={(txt) => setTask(txt)}
          multiline
        />

        <Text style={{ fontWeight: 'bold', color: 'lightgreen', marginTop: 10 }}>Due Date</Text>
        <View style={styles.inputView}>
        <TextInput style={{fontSize:18,fontWeight:'bold',color:'white'}}
          value={`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
          editable={false}
          // onChangeText={() => setDate()}   
        />
        <TouchableOpacity onPress={()=>setOpen(true)} style={{justifyContent:'center',alignItems:'center',padding:2,marginRight:5}}>
        <Fontisto name='date'  />
        </TouchableOpacity>

        </View>

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
        <TouchableOpacity onPress={()=>edit()} style={styles.btn}>
          <MaterialIcons name='check' style={{ fontSize: 40, color: 'darkgreen' }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Edittask

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
    width: '80%',
  },
  inputView: {
    color: 'white',
    margin: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    width: '80%',
    flexDirection:'row',
    justifyContent:'space-between',
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