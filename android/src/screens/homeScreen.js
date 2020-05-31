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





HomeScreen = ({navigation})=> {
  return (
         <View style={styles.a}>
          <Text style={styles.b}>
                 HomeScreen
          </Text>

          <Button 
            title="Go to details screen"
            onPress={() => navigation.navigate("Details")}
           />
            
          </View>
  );
};

export default HomeScreen;

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