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
import SupportScreen from './android/src/screens/supportScreen';
import SettingsScreen from './android/src/screens/settingsScreen';
import BookMarkScreen from './android/src/screens/boockMarkScreen';
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>   

      <Drawer.Navigator drawerContent={props=><DrawerContent{...props}/>}>
          <Drawer.Screen name="HomeDrawer" component={MainTabsScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="BookMarkScreen" component={BookMarkScreen} />
      </Drawer.Navigator>
    
    </NavigationContainer>
  );
}

export default App;
