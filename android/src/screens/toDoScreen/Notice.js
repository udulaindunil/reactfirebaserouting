import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Alert } from 'react-native';
import { List } from 'react-native-paper';
import Swipeout from 'react-native-swipeout';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient';

function Notice({item,navigation,history}){

    const swipeSettinngs={
        autoClose:true,
        
        right:[{
            onPress: ()=>{
                deleted(item.key)
            },
            type: 'Delete',
            text: 'Delete',
            backgroundColor:"#f77e8a",
            borderRadius: 10
            
        }]
    }

    function deleted(key){
        if(history==true){
            Alert.alert('Danger!','Are you sure, You want to permanantly delete this notice',[
                {text:'Yes', onPress:()=>firestore().collection('notices').doc(key).delete()
                },{text:'No', onPress:()=>{}}
            ])

            
        }else{
            Alert.alert('Removing From Notice board','This Notice remove form the noticeboard and will apear on History',[
                {text:'Ok', onPress:()=>firestore().collection('notices').doc(key).update({state:'deleted'})
                },{text:'back', onPress:()=>{}}
            ])
        }
        
    }


    return(

        

      
        <Swipeout {...swipeSettinngs}>
            <LinearGradient
            colors={['#11f7e5', '#08ab9d']}
            style={styles.noticeElement}>

                            <TouchableOpacity
                                onPress={()=>navigation.navigate('UpdateNoticeScreen',item)}
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

export default Notice;


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
    //   notice:{
    //       fontSize: 20,
    //       fontFamily: 'arial'
    //   }
    // ,
    detailsText:{
        color: "#1c6161"
    }


})
