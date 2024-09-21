import React from 'react'
import { Redirect } from 'expo-router';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

const Welcome = () => {
  return (
    <Redirect href="/home"/>
  )
}

export default Welcome