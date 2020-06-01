/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabsScreen from './android/src/screens/mainTabScreen';
import DrawerContent from './android/src/screens/drawerContent';
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>   

      <Drawer.Navigator drawerContent={props=><DrawerContent{...props}/>}>
          <Drawer.Screen name="Home" component={MainTabsScreen} />
          {/* <Drawer.Screen name="Details" component={detailsStackScreen} /> */}
      </Drawer.Navigator>
    
    </NavigationContainer>
  );
}

export default App;
