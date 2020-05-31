/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './android/src/screens/homeScreen'
import DetailsScreen from './android/src/screens/detailsScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,

} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const homeStack = createStackNavigator();
const detailsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeStackScreen =({navigation})=>{
  return (
  <homeStack.Navigator screenOptions={{
        headerStyle:{
           backgroundColor: '#171F06'
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
          fontWeight: 'bold'
        }
      }}>
        <homeStack.Screen 
          name="Home" 
          component={HomeScreen} 
          options ={{
            title:"OverView",
            headerLeft: ()=>{
              return (
              <Icon.Button 
                  name="ios-menu"
                  size={25}
                  onPress={()=>navigation.openDrawer()}
                  backgroundColor="#171F06"
               >
              </Icon.Button>)
            }
          }}
             />
      </homeStack.Navigator> 
      );
}


const detailsStackScreen =({navigation})=>{
  return (
  <detailsStack.Navigator screenOptions={{
        headerStyle:{
           backgroundColor: '#171F06'
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
          fontWeight: 'bold'
        }
      }}>
        <detailsStack.Screen 
          name="Details" 
          component={DetailsScreen} 
             />
      </detailsStack.Navigator> 
      )
}




function App() {
  return (
    <NavigationContainer>   

      <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={homeStackScreen} />
          <Drawer.Screen name="Details" component={detailsStackScreen} />
      </Drawer.Navigator>
    
    </NavigationContainer>
  );
}

export default App;
