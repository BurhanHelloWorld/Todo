import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AntDesign from 'react-native-vector-icons/AntDesign'


const Home = ({ navigation }) => {


  const add = () => {
    navigation.navigate('Addtask')
  }

  const [qtask, setQtask] = useState(null)
  const [getdatabase, setGetdatabase] = useState(null)

  const get = async () => {
    try {

      // await database().ref('tasks').on("value",(tempdata)=>{   
      // setGetdatabase(tempdata.val());
      // console.log('gettttttt==========>', tempdata)
      await database().ref(`tasks`).child(auth().currentUser.uid).on("value", (tempdata) => {

        let get = []

        tempdata.forEach(child => {
          const obj = {key: child.key, innerData:child.val()}
          get.push(obj);
        });
        setGetdatabase(get)
        console.log('gettttt====>', getdatabase)
        // setGetdatabase(tempdata.val());
        // console.log('gettttttt==========>', getdatabase)
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  const storeQtask = async () => {
    try {
      // const index = getdatabase.length;
      // const storetask = await database().ref(`tasks/${index}`)
      // .set({ task: qtask, key:index })

      const storetask = await database().ref(`tasks`).child(auth().currentUser.uid).push()
        .set({ task: qtask })
      console.log(storetask)
    } catch (error) {
      console.log(error)
    }
  }


  const renderView = ({ item }) => {

    const del = async (k) => {
      try {
        // const D =
        console.log('kkkkkkkk==========>>>', k)
        await database().ref('tasks').child(`${item.key}`).remove();
        const D = await database().ref(`tasks`).child(auth().currentUser.uid).child(`${k}`).remove();
        console.log(D);
      } catch (err) {
        console.log(err);
      }
    }
    const edit = () => {
      navigation.navigate("Edittask", {Items : item})
    }

    // console.log('===============>', item)
    if (item !== null) {
      return (
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'green', width: '90%', margin: 5, padding: 5, borderRadius: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{item?.innerData.task}</Text>
              {/* <Text style={{ color: 'white', fontWeight: 'bold' }}>{item?.key}</Text> */}

              <TouchableOpacity onPress={() => del(item?.key)} style={{ width: 30, margin: 5 }}>
                <Text> <AntDesign name='delete' style={{ fontSize: 18, color: 'white' }} /> </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: 'lightgreen' }}>{item?.innerData.date}</Text>
              <TouchableOpacity onPress={()=>edit()} style={{ width: 30, margin: 5 }}>
                <Text> <AntDesign name='edit' style={{ fontSize: 18, color: 'white' }} /> </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }

  return (
    <View style={styles.Container}>
      <Text style={styles.Maintext}>Lists</Text>

      <TouchableOpacity onPress={() => get()}>
        <Text>GetData</Text>
      </TouchableOpacity>


      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'darkgreen', height: '85%', width: '100%' }}>
          <FlatList
            data={getdatabase}
            renderItem={renderView}
          />
        </View>
        <View style={styles.Container1}>
          <TouchableOpacity onPress={() => add()} style={styles.btn}>
            <MaterialIcons name='add' style={{ fontSize: 40, color: 'darkgreen' }} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputView}>
        <TextInput style={styles.input}
          placeholder='Enter Quick Task Here'
          value={qtask}
          onChangeText={(txt) => setQtask(txt)}
          multiline
        />
        <TouchableOpacity onPress={() => storeQtask()} style={styles.btn1}>
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Maintext: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: 'darkgreen'
  },
  Container1: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'darkgreen',
    // marginTop: 5
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
  inputView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'green',
    flexDirection: 'row',
  },
  input: {
    padding: 10,
    color: 'white',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '75%'
  },
  btn1: {
    backgroundColor: 'darkgreen',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 35,
    borderRadius: 15
  }

})