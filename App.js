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
import AddNoticeScreen from './android/src/screens/drawerScreens/addNoticeScreen';
import SettingsScreen from './android/src/screens/drawerScreens/settingsScreen';
import BookMarkScreen from './android/src/screens/drawerScreens/boockMarkScreen';
import UpdateNoticesScreen from './android/src/screens/drawerScreens/updateNotices';
import UpdateNoticeScreen from './android/src/screens/components/UpdateNotice';
import CommentNoticeScreen from './android/src/screens/components/commentNotice';
import NoticeCommentsScreen from './android/src/screens/drawerScreens/noticeComments';
import NoticeHistoryScreen from './android/src/screens/drawerScreens/noticeHistoryScreen';
import NoticeImageScreen from './android/src/screens/drawerScreens/noticeImageScreen';
import RootStackScreen from './android/src/screens/rootStackScreen';
import { View } from 'react-native-animatable';
import {ActivityIndicator } from 'react-native-paper';
import {AuthContext } from './contextFiles/context';

import {UserDetails } from './contextFiles/userDetailsContext';
import firestore from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth';
// import PushNotification from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");
export const userDetailsContext = React.createContext();

const Drawer = createDrawerNavigator();

function App() {

  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },

    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
  
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);

    },

    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,

    requestPermissions: true,
  });

  const [isLoading, setIsLoading] = useState('');
  const [error,setError] = useState('');

  const initialLoginState={
    isLoading:true,
    userEmail : null,
    userId : null,
    role: null,
    username: null,
    name: null,
    error:null,
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
          username: action.username,
          name: action.name,
          isLoading : false,
          profileImage: action.profileImage
        };

      case 'SIGNUP':
        return{
          ...prevState,
          userEmail: action.email,
          userId: action.uid,
          role:action.role,
          username: action.username,
          name: action.name,
          isLoading : false,
        };

      case 'LOGOUT':
        return{
          ...prevState,

          userEmail: null,
          userId: null,
          role: null,
          username: null,
          name: null,
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
        console.log(res.user.email);
        // for the production here
        firestore().collection('users').where('uid','==',res.user.uid).get().then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot=>{
            // console.log(documentSnapshot.data());
            
             let role=documentSnapshot.data().role;
             let username=documentSnapshot.data().username;
             let name=documentSnapshot.data().name;
             let profileImage= documentSnapshot.data().profileImage;
             
             console.log(role);
             dispatch({type:'SIGNIN',email:res.user.email, uid :res.user.uid, role:role,username:username,name:name,profileImage:profileImage});
          });
        });
      },error=>{
        return error;
      })
      
       // for the devlopment
      //  dispatch({type:'SIGNIN',email: "udulaindnil@gmail.com", uid :"FwjLyv1K2mSUFbdF4U6ieVpQEph2", role:"admin"});
    },
    signOut:()=>{
      auth().signOut().then(() => {
        console.log('User signed out!');
        dispatch({type:'LOGOUT'});
    },error=>{
      dispatch({type:'LOGOUT'});
    });
    },
    signUp:(name,profileImage,username,email,password,role)=>{
      console.log(role);
      auth().createUserWithEmailAndPassword(email,password).then((res)=>{
        console.log("user created");
        console.log(res.user.email);
        firestore().collection('users').doc(res.user.uid).set({name:name,profileImage:profileImage,username:username,email:res.user.email,uid:res.user.uid,role:role});
        dispatch({type:'SIGNUP',email: res.user.email, uid :res.user.uid, role:role,username:username,name:name});
      },error=>{
        return error;
      })
    }
  }));

  useEffect(() => {



    setTimeout(()=>{

      // for testing 
      authContext.signIn('udulaindunil@gmail.com','123456')
      // authContext.signIn('shenal@gmail.com','1234567')
      
      // this under code is for orginal
      // setIsLoading(false);
      // let userId;
      // userId = null
      // dispatch({type:'RETRIVE_TOKEN', uid :userId});
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
                    <Drawer.Screen name="AddNoticeScreen" component={AddNoticeScreen} />
                    <Drawer.Screen name="UpdateNoticesScreen" component={UpdateNoticesScreen} />
                    <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                    <Drawer.Screen name="BookMarkScreen" component={BookMarkScreen}  initialParams={{ userId: loginState.userId}}/>
                    <Drawer.Screen name="UpdateNoticeScreen" component={UpdateNoticeScreen} />
                    <Drawer.Screen name="CommentNoticeScreen" component={CommentNoticeScreen} />
                    <Drawer.Screen name="NoticeCommentsScreen" component={NoticeCommentsScreen} />
                    <Drawer.Screen name="NoticeHistoryScreen" component={NoticeHistoryScreen} />
                    <Drawer.Screen name="NoticeImageScreen" component={NoticeImageScreen} />
                    
                    
                    
                    {/*  */}
                    
                  </Drawer.Navigator>
                ): (    
                  
                    <RootStackScreen />
                                                           
                  )}
              </NavigationContainer>
      </UserDetails.Provider>
    </AuthContext.Provider>
  );
}

export default App;
 