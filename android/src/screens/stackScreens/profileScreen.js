import React,{useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,

} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { UserDetails } from '../../../../contextFiles/userDetailsContext';



ProfileScreen = ({navigation})=> {
  const userDetails = useContext(UserDetails);
  return (
        <View style={styles.container}>
         
          
          <View style={{justifyContent:"center"}}>
                    <View style={styles.row}>
                      <Text style={styles.th}>User Name</Text>
                      <Text style={styles.td}>{userDetails.username}</Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.th}>Name</Text>
                      <Text style={styles.td}>{userDetails.name}</Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.th} >Email</Text>
                      <Text style={styles.td}>{userDetails.userEmail}</Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.th} >Role</Text>
                      <Text style={styles.td}>{userDetails.role}</Text>
                    </View>
          </View>
        </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
 container:{
   flex:1,
   padding: 8,
 },
 row:{
  marginTop:10,
  padding:10,
  flexDirection: "column",
  justifyContent: 'center',
 },
 th:{
   color:"#03544e",
   fontWeight: "bold",
   
 },
 td:{
   color:"#353838"
 }
});