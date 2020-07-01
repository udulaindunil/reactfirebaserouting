import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment'


const usersCollection = firestore().collection('notices');


SupportScreen = ({navigation})=> {


  const [notice,setNotice] = useState('');
  const [response,setResponse] = useState('')

  function publishNotice(){
    var date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss a');
    usersCollection.add({
    notice: notice,
    date: date,
  })
  .then(() => {
    console.log("Notice Added");
    
    setTimeout(()=>{
      setResponse('Notice added!');
    },1000)
  },error=>{
    Alert.alert('oops!','Something went wrong',
    [{text:'understodd',onPress:()=> console.log('alert closed')
    }])
  });
  
}

  return (
         <View style={styles.container}>
           <View style={styles.header}>
                <Text style={styles.text_header}>
                  Add New Notice
                </Text>
           </View>

          <View style={styles.noteInput}>
          <Text style={styles.text_footer}>
                        Notice
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome 
                            name="user-o"
                            color="#05375a"
                            size={20}/>
                        <TextInput
                            multiline={true}
                            numberOfLines={12}
                            placeholder="Your Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setNotice(val)}
                            />

          </View>
          
          </View>

          <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => publishNotice()}
                        >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={styles.signIn}
                                    >
                                    <Text    
                                        style={[styles.textSign, {color:'#fff'}]}>
                                               Publish notice
                                    </Text>
                                </LinearGradient>
                        </TouchableOpacity>

           <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => navigation.navigate("Home")}
                        >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={styles.signIn}
                                    >
                                    <Text    
                                        style={[styles.textSign, {color:'#fff'}]}>
                                               Home
                                    </Text>
                                </LinearGradient>
                        </TouchableOpacity>
            
          </View>
  );
};

export default SupportScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff'
  },
  header: {
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: '#009387',
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 20
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      paddingLeft: 10,
      color: '#05375a',
  },

  noteInput:{
    marginTop: '20%',
    padding:'8%',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      alignItems: 'flex-end',
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});
