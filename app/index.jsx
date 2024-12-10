import React from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

const Welcome = () => {
  return (
    <View>
      <Redirect href="/home"/>
    </View>
  )
}

export default Welcome