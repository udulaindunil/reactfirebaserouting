import React,{useState,useEffect,useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList

} from 'react-native';
import firestore from "@react-native-firebase/firestore"
import { UserDetails } from '../../../../contextFiles/userDetailsContext';
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

      <View style={styles.header}>
          <Text style={{color:'#fff',fontSize:26, fontWeight:"bold"}}>Update Notices</Text>
      </View>

    <View style={styles.container}>

    <FlatList
    style={{width:'100%'}}
    data={notices}
    keyExtractor={(item)=>item.key}
    renderItem={({ item }) => (<Notice item={item} navigation={navigation}/>)}
    />
    
    </View>
    <View style={styles.intro}>
      <Text>For Update touch the notice</Text>
      <Text>For delete wipe from the right to left</Text>
    </View>
  </>
  );
};

export default UpdateNoticesScreen;

const styles = StyleSheet.create({
  header:{
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 26,
    backgroundColor:'#009387',
},
  container:{
    width:'100%',
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#fff"
  },
  b:{
   color:"blue"
  },
  intro:{
    alignContent: "flex-end"
  }
});