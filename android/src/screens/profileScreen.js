import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,

} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




ProfileScreen = ({navigation})=> {
  return (
         <View style={styles.a}>
          <Text style={styles.b}>
                 Profile Screen
          </Text>

          <Button 
            title="Go to details screen"
            onPress={() => navigation.navigate("Details")}
           />
            
          </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  a:{
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },
  b:{
   color:"blue"
  }
});