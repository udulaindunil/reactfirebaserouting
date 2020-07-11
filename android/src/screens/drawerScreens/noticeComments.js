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
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient';


NoticeCommentsScreen = ({navigation,route})=> {
    const id = route.params.key;
    console.log(id+"heree is going");
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

  const [comments,setComments] = useState()

  useEffect(()=>{     
      let status = 'active'
    const subscriber = firestore().collection('notices').doc(id).collection('comments').onSnapshot(querySnapshot=>{
        const comments = [];
        querySnapshot.forEach(documentSnapshot=>{
            comments.push({
                ... documentSnapshot.data(),
                key: documentSnapshot.id,
            });            
        });
        setComments(comments);
    });
    return () => subscriber();       
},[])


  return (
    <>

      <View style={styles.header}>
          <Text style={{color:'#fff',fontSize:26, fontWeight:"bold"}}>Comments</Text>
      </View>

    <View style={styles.container}>

    <FlatList
    style={{width:'100%'}}
    data={comments}
    keyExtractor={(item)=>item.key}
    renderItem={({ item }) => (

            <LinearGradient
            colors={['#11f7e5', '#08ab9d']}
            style={styles.commentElement}>

                                <View style={styles.comment}>
                                        <Text style={styles.textComment}>{item.comment}</Text>
                                </View>
            <View style={styles.details}>
                <Text style={styles.detailsText}>{item.author}</Text>
                <Text style={styles.detailsText}>{moment(item.date).fromNow()}</Text>
            </View>
            </LinearGradient>
    )}
    />
    
    </View>
  </>
  );
};

export default NoticeCommentsScreen;

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
  textComment:{
    fontSize: 18,
    color: "#01423d"
  },
  commentElement:{
    margin:5,
    padding:5,
    backgroundColor: "#52aba4",
    borderRadius: 8
  },
  comment: {
    flex: 1,
    fontSize: 16,
    color:'#013636',
    padding:10,
    alignContent: "center",
    textAlign: "justify",
  },
  intro:{
    alignContent: "flex-end"
  },
  details: {
    flex: 1,
    flexDirection: 'row', 
    padding:10,
    justifyContent: 'space-between',
  },
  detailsText:{
    color: "#1c6161"
    }
});