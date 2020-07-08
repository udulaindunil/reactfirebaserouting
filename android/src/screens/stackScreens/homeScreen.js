import React,{useState,useEffect,useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList

} from 'react-native';

import firestore from "@react-native-firebase/firestore"
import { UserDetails } from '../../../../components/userDetailsContext';



HomeScreen = ({navigation})=> {

  const userDetails = useContext(UserDetails);

  const [notices,setNotices] = useState()

  useEffect(()=>{     
    const subscriber = firestore().collection('notices').onSnapshot(querySnapshot=>{
        const notices = [];
        querySnapshot.forEach(documentSnapshot=>{
          notices.push({
                ... documentSnapshot.data(),
                key: documentSnapshot.id,
            });            
        });
        setNotices(notices);
    });
    return () => subscriber();       
},[])


  return (
    <>
    <FlatList
    data={notices}
    keyExtractor={(item)=>item.key}
    renderItem={({ item }) => (
    <View style={{ height: 90, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <Text>Notice: {item.notice}</Text>
        <Text>Published: {item.date}</Text>
        <Text>Complete: {item.complete}</Text>
    </View>
    )}
    />
  </>
  );
};

export default HomeScreen;

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