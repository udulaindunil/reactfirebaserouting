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
import Swipeout from 'react-native-swipeout';
import Notice from '../toDoScreen/Notice'



UpdateNoticesScreen = ({navigation})=> {

    const swipeSettinngs={
        autoClose:true,
        right:[{
            onPress: ()=>{
                deleted(doc.key)
            },
            type: 'Delete',
            text: 'Delete'
        }]
    }

  const userDetails = useContext(UserDetails);

  const [notices,setNotices] = useState()

  useEffect(()=>{     
      let status = 'active'
    const subscriber = firestore().collection('notices').where('uid','==',userDetails.userId).where('state','==',"active").onSnapshot(querySnapshot=>{
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
    <View style={styles.container}>

     <Swipeout {...swipeSettinngs}>
    <FlatList
    data={notices}
    keyExtractor={(item)=>item.key}
    renderItem={({ item }) => (<Notice item={item} navigation={navigation}/>)}
    />
    </Swipeout>
    </View>
    
  </>
  );
};

export default UpdateNoticesScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#fff"
  },
  b:{
   color:"blue"
  }
});