/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{ useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabsScreen from './android/src/screens/mainTabScreen';
import DrawerContent from './android/src/screens/drawerContent';
import SupportScreen from './android/src/screens/supportScreen';
import SettingsScreen from './android/src/screens/settingsScreen';
import BookMarkScreen from './android/src/screens/boockMarkScreen';
import RootStackScreen from './android/src/screens/rootStackScreen';
import { View } from 'react-native-animatable';
import {ActivityIndicator } from 'react-native-paper';
import {AuthContext } from './components/context';

import {UserDetails } from './components/userDetailsContext';
import firestore from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth';
export const userDetailsContext = React.createContext();

const Drawer = createDrawerNavigator();

function App() {

  const [isLoading, setIsLoading] = useState('');

  const initialLoginState={
    isLoading:true,
    userEmail : null,
    userId : null,
    role: null,
  }

  const loginReducer =(prevState,action)=>{
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return{
          ...prevState,
          userId: action.uid,
          role:null,
          isLoading : false,
        };

      case 'SIGNIN':
        return{
          ...prevState,
          userEmail: action.email,
          userId: action.uid,
          role:action.role,
          isLoading : false,
        };

      case 'SIGNUP':
        return{
          ...prevState,
          userEmail: action.email,
          userId: action.uid,
          role:action.role,
          isLoading : false,
        };

      case 'LOGOUT':
        return{
          ...prevState,

          userEmail: null,
          userId: null,
          role: null,
          isLoading : false,
        };
      
      case 'REGISTER':
        return{
          ...prevState,
          isLoading : false,
        };
    
    }
  }


  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  const authContext = React.useMemo(()=>({
    signIn:(email,password)=>{
      let userToken;
      userToken= null;

      auth().signInWithEmailAndPassword(email,password).then((res)=>{
        console.log("sign with user in firebase");
        firestore().collection('users').where('uid','==',res.user.uid).get().then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot=>{
            // console.log(documentSnapshot.data());
            
             let role=documentSnapshot.data().role;
             console.log(role);
             
             dispatch({type:'SIGNIN',email: res.user.email, uid :res.user.uid, role:role});
          });
        });
      },error=>{
        console.log(error);
      })
      
    },
    signOut:()=>{
      auth().signOut().then(() => {
        console.log('User signed out!');
        dispatch({type:'LOGOUT'});
    },error=>{
      dispatch({type:'LOGOUT'});
      console.log(error);
    });
    },
    signUp:(email,password,role)=>{
      console.log(role);
      
      auth().createUserWithEmailAndPassword(email,password).then((res)=>{
        console.log("user created");
        console.log(res.user.email);
        firestore().collection('users').add({email:res.user.email,uid:res.user.uid,role:role});
        dispatch({type:'SIGNUP',email: res.user.email, uid :res.user.uid, role:role});
      },error=>{
        console.log(error);
      })
    }
  }));

  useEffect(() => {
    setTimeout(()=>{

      // for testing 
      // authContext.signIn('udulaindunil@gmail.com','123456')
      
      // this under code is for orginal
      setIsLoading(false);
      let userId;
      userId = null
      dispatch({type:'RETRIVE_TOKEN', uid :userId});
    },1000);
  }, []);



  if(loginState.isLoading){
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <UserDetails.Provider value={loginState}>

              <NavigationContainer>
                {loginState.userId !== null ?(
                  <Drawer.Navigator drawerContent={props=><DrawerContent{...props}/>}>
                    <Drawer.Screen name="HomeDrawer" component={MainTabsScreen}  />
                    <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                    <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                    <Drawer.Screen name="BookMarkScreen" component={BookMarkScreen}  initialParams={{ userId: loginState.userId}}/>
                  </Drawer.Navigator>
                ):<RootStackScreen/>}
              </NavigationContainer>
      </UserDetails.Provider>
    </AuthContext.Provider>
  );
}

export default App;
 