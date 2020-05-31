import React from 'react'
import {StyleSheet, View , Text} from 'react-native'

function GroupScreen (){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
           GroupScreen
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb',
    },
    text:{
        color:'#010101',
        fontSize: 24,
        fontWeight:'bold'
    }
})

export default GroupScreen;