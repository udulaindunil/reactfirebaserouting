/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{ useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabsScreen from './android/src/screens/mainTabScreen';
import DrawerContent from './android/src/screens/drawerContent';
import SupportScreen from './android/src/screens/supportScreen';
import SettingsScreen from './android/src/screens/settingsScreen';
import BookMarkScreen from './android/src/screens/boockMarkScreen';
import RootStackScreen from './android/src/screens/rootStackScreen';
import { View } from 'react-native-animatable';
import { ActivityIndicator } from 'react-native-paper';
import {AuthContext } from './components/context'
const Drawer = createDrawerNavigator();

function App() {

  // const [isLoading,setIsLoading] = React.useState(true);
  // const [userToken,setUserToken] = React.useState(null);

  const initialLoginState={
    isLoading:true,
    userName : null,
    userToken : null,
  }

  const loginReducer =(prevState,action)=>{
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return{
          ...prevState,
          userToken: action.token,
          isLoading : false,
        };

      case 'LOGIN':
        return{
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading : false,
        };

      case 'LOGOUT':
        return{
          ...prevState,

          userName: null,
          userToken: null,
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
    signIn:(userName,password)=>{
      let userToken;
      userToken= null;
      if(userName =='user' && password == 'pass'){
        userToken = 'jsjsd';
      }

      console.log(userToken,"user token");
      
      dispatch({type:'LOGIN',id: userName, token :userToken});
    },
    signOut:()=>{
      dispatch({type:'LOGOUT'});
    },
    signUp:()=>{
      setUserToken('sjdcjbsdc');
      setIsLoading(false);
    }
  }));

  useEffect(() => {
    setTimeout(()=>{
      // setIsLoading(false);
      let userToken;
      userToken ='ajsbxjasb'
      dispatch({type:'RETRIVE_TOKEN', token :userToken});
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
              <NavigationContainer>
                {loginState.userToken !== null ?(
                <Drawer.Navigator drawerContent={props=><DrawerContent{...props}/>}>
                    <Drawer.Screen name="HomeDrawer" component={MainTabsScreen} />
                    <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                    <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                    <Drawer.Screen name="BookMarkScreen" component={BookMarkScreen} />
                  </Drawer.Navigator>

                ):<RootStackScreen/>}
              </NavigationContainer>
        </AuthContext.Provider>
  );
}

export default App;
 