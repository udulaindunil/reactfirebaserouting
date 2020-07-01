import React ,{useState,useEffect} from 'react'
import {Text,StyleSheet} from 'react-native'
import { Appbar,TextInput,Button } from 'react-native-paper'
import firebase from '@react-native-firebase/database'
import {FlatList} from 'react-native'
import Todos from './Todos'
import auth from '@react-native-firebase/auth';


BookMarkScreen = ({ navigation, route })=> {
 
  const [task,setTask] = useState('');
  const [description,setDescription] = useState('')
  const userId = route.params.userId;
  const db = firebase().ref(`tasks/${userId}`)
  const [tasks,setTasks] = useState([]);

  useEffect(()=>{       
    
      
      
      return db.on('value',(snapshot)=>{
          const list=[];
          snapshot.forEach(doc=>{
              list.push({doc})
          });
          
          console.log() 
          setTasks(list)
      })
  },[])



  async function addTask(){
    db.push({
          task: task,
          description: description,
          complete: false
      })
      setTask('');
      setDescription('');
  }

  return (
      <>
      <Appbar>
          <Appbar.Content title={"Task App"}/>
      </Appbar>
      <FlatList
          style={{flex: 1,width:'100%'}}
          data={tasks}
          keyExtractor={(item)=>item.key}
          renderItem={({item})=><Todos {...item}/>}
      />

      <Text>Task: {task}</Text>
      <Text>Description: {description}</Text>
      <TextInput label={'new task'} value={task} onChangeText={setTask}/>
      <TextInput label={'Description'} value={description} onChangeText={setDescription}/>
      <Button onPress={()=>{addTask()}}>Add task</Button>
      </>
      );
};

export default BookMarkScreen;

const styles = StyleSheet.create({
  a:{
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },
  b:{
   color:"blue"
  }
});