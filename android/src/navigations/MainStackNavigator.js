import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen'
import GroupScreen from '../screens/GroupScreen'
import AddGroupScreen from '../screens/AddGroupScreen'
import ChatScreen from '../screens/ChatScreen'

const Stack = createStackNavigator();

function ChatFlow() {
    return(
        <NavigationContainer>
            <Stack.Navigator name="Chat">
                <Stack.Screen
                    name="SignInScreen"
                    components ={SignInScreen}
                    // options={{headerShow =false}}
                    >
                </Stack.Screen>

             <Stack.Screen
                    name="Group Screen"
                    components ={GroupScreen}
                    // options={{title ='Groups'}}
                    >
                </Stack.Screen>

                 <Stack.Screen
                    name="Add Group Screen"
                    components ={AddGroupScreen}
                    // options={{title = "Add Groups"}}
                    >
                </Stack.Screen>

                 <Stack.Screen
                    name="Chat Screen"
                    components ={ChatScreen}
                    // options={{title= "Chats"}}
                    >
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function MainStackNavigator(){
    return (
        ChatFlow()
    );
}

export default MainStackNavigator;


