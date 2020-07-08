import React,{useState,useEffect,useContext} from 'react';
import {View,StyleSheet} from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons' 
import { floor } from 'react-native-reanimated';
import {AuthContext} from '../../../../components/context';
import auth from '@react-native-firebase/auth';
import User from '@react-native-firebase/app'
import { UserDetails } from '../../../../components/userDetailsContext';

export function AdminDrawerContent(props){

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const {signOut} = React.useContext(AuthContext);
    const userDetails = useContext(UserDetails);
    const toggleTheme =()=>{
        setIsDarkTheme(!isDarkTheme);
    }
    const paperTheme = useTheme();


    //for firbase user here
    const [userEmail, setEmail] = useState();
    const [firebaseUser,setFirebaseUser] = useState();

    useEffect(() => {
        setEmail(auth().currentUser.email);
    }, []);



    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image source={{
                                // uri: 'https://scontent.fcmb10-1.fna.fbcdn.net/v/t1.0-9/83548262_2225886281048391_8833482001009868800_n.jpg?_nc_cat=106&_nc_sid=09cbfe&_nc_ohc=uZLyz4PhJZsAX_MVAmE&_nc_ht=scontent.fcmb10-1.fna&oh=a3ea5805e66e773c46e03d84005d778c&oe=5EF9CC3E'
                            }}
                            size={50}/>
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>
                                    {userEmail}
                                </Title>
                                <Caption style={styles.caption}>Admin

                                </Caption>
                            </View>
                        </View>


                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="To Dos"
                            onPress={() => {props.navigation.navigate('BookMarkScreen')}}
                        />      

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="New Notice"
                            onPress={() => {props.navigation.navigate('AddNoticeScreen')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={()=>{toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">

                                </View>
                                <Switch value={paperTheme.dark}/>
                            </View>
                        </TouchableRipple>

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color,size})=>{
                        <Icon
                        name = "exit-to-app"
                        color={color}
                        size={size}
                        />
                    }}
                    label="Sign Out"
                    onPress={()=>{signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 12,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 2,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });


export default AdminDrawerContent;