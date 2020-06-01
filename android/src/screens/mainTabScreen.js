import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from './homeScreen'
import DetailsScreen from './detailsScreen'
import ProfileScreen from './profileScreen'
import ExploreScreen from './exploreScreen'

import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const MainTabsScreen = ()=>{
    return (
        <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        style={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={homeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#090d23',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-home" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="DetailsScreen"
          component={detailsStackScreen}
          options={{
            tabBarLabel: 'Details',
            tabBarColor: '#190d23',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-notifications" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={profileStackScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#290d23',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-person" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="ExploreScreen"
          component={exploreStackScreen}
          options={{
            tabBarLabel: 'Explore',
            tabBarColor: '#390d23',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-person" color={color} size={26} />
            ),
          }}
        />


      </Tab.Navigator>

      
    );
}


const homeStack = createStackNavigator();
const detailsStack = createStackNavigator();
const profileStack = createStackNavigator();
const exploreStack = createStackNavigator();


const homeStackScreen =({navigation})=>{
    return (
    <homeStack.Navigator screenOptions={{
          headerStyle:{
             backgroundColor: '#090d23'
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
                    backgroundColor="#090d23"
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
             backgroundColor: '#190d23'
          },
          headerTintColor: '#fff',
          headerTitleStyle:{
            fontWeight: 'bold'
          }
        }}>
          <detailsStack.Screen 
            name="Details" 
            component={DetailsScreen}
            options ={{
                title:"Details",
                headerLeft: ()=>{
                  return (
                  <Icon.Button 
                      name="ios-menu"
                      size={25}
                      onPress={()=>navigation.openDrawer()}
                      backgroundColor="#190d23"
                   >
                  </Icon.Button>)
                }
              }} 
               />
        </detailsStack.Navigator> 
        )
  }

  const profileStackScreen =({navigation})=>{
    return (
    <homeStack.Navigator screenOptions={{
          headerStyle:{
             backgroundColor: '#290d23'
          },
          headerTintColor: '#fff',
          headerTitleStyle:{
            fontWeight: 'bold'
          }
        }}>
          <homeStack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options ={{
              title:"Profile",
              headerLeft: ()=>{
                return (
                <Icon.Button 
                    name="ios-menu"
                    size={25}
                    onPress={()=>navigation.openDrawer()}
                    backgroundColor="#290d23"
                 >
                </Icon.Button>)
              }
            }}
               />
        </homeStack.Navigator> 
        );
  }

  const exploreStackScreen =({navigation})=>{
    return (
    <homeStack.Navigator screenOptions={{
          headerStyle:{
             backgroundColor: '#390d23'
          },
          headerTintColor: '#fff',
          headerTitleStyle:{
            fontWeight: 'bold'
          }
        }}>
          <homeStack.Screen 
            name="Expolre" 
            component={ExploreScreen} 
            options ={{
              title:"Explore",
              headerLeft: ()=>{
                return (
                <Icon.Button 
                    name="ios-menu"
                    size={25}
                    onPress={()=>navigation.openDrawer()}
                    backgroundColor="#390d23"
                 >
                </Icon.Button>)
              }
            }}
               />
        </homeStack.Navigator> 
        );
  }

  export default MainTabsScreen;
  