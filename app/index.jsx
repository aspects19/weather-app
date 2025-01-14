import React from 'react';
import { View , Text} from 'react-native';
import { Redirect } from 'expo-router';

const Welcome = () => {
  return (
    <View>
       <Redirect href="/home"/> 
    </View>
  )
}

export default Welcome