import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import Swipeout from 'react-native-swipeout';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient';

function PublicNotices({item,navigation}){

    const swipeSettinngs={
        autoClose:true,
        
        right:[{
            onPress: ()=>{
                putComment()
            },
            type: 'Comment',
            text: 'Comment',
            backgroundColor:"#0c4d48",
            borderRadius: 10
            
        }]
    }

    function deleted(key){
        // firebase.database().ref('tasks/').child(doc.key).remove()
        firestore().collection('notices').doc(key).update({state:'deleted'})
    }

    function putComment(){
        navigation.navigate('CommentNoticeScreen',item);
    }

    // async function toggleComplete(){
    //     await firebase().ref(`tasks/${userId}`).child(doc.key).update({complete:!doc.val().complete})
    // } 

    return(
     
        <Swipeout {...swipeSettinngs}>
            <LinearGradient
            colors={['#11f7e5', '#08ab9d']}
            style={styles.noticeElement}>

                            <TouchableOpacity
                                onPress={()=>{navigation.navigate('NoticeCommentsScreen',item)}}
                                >
                                    <View style={styles.notice}>
                                        <Text style={styles.notice}>{item.notice}</Text>
                                    </View>
                            </TouchableOpacity>


                            <View style={styles.details}>
                                <Text style={styles.detailsText}>{item.author}</Text>
                                <Text style={styles.detailsText}>{moment(item.date).fromNow()}</Text>
                                {/* <Text>Date: {}</Text> */}
                            </View>
           
            </LinearGradient>
        </Swipeout>
       
    );

}

export default PublicNotices;


const styles = StyleSheet.create({

    noticeElement:{
        margin:5,
        padding:5,
        backgroundColor: "#52aba4",

        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    notice: {
      flex: 1,
      fontSize: 16,
      color:'#013636',
      padding:10,
      alignContent: "center",
      textAlign: "justify",
    },
    details: {
        flex: 1,
        flexDirection: 'row', 
        padding:10,
        justifyContent: 'space-between',
        
      },
      notice:{
          fontSize: 20,
          fontFamily: 'arial'
      }
    ,
    detailsText:{
        color: "#1c6161"
    }


})
