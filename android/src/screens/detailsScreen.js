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


DetailsScreen = ({navigation}) => {
  return (
     <>    

     <View style={styles.a}>
          <Text style={styles.b}>
              Details Screen
          </Text>

           <Button 
            title="Refresh"
            onPress={() => navigation.push("Details")}
           />

            <Button 
            title="Go Back"
            onPress={() => navigation.goBack()}
           />


            <Button 
            title="Go To Welcome Page"
            onPress={() => navigation.popToTop()}
           />
     </View>
    </>
  );
};

export default DetailsScreen;