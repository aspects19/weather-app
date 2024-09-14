import { View, Text, ScrollView, TextInput } from 'react-native'
import React from 'react';
import Home from './home';
import { SafeAreaView } from 'react-native-safe-area-context'

const search = () => {
  return (
    <SafeAreaView>
      <ScrollView className='h-full bg-primary'>
        <TextInput
          placeholder='Type a location'
          placeholderTextColor={"#333941"}
          className='absolute h-8  bg-[#c1c3c5] z-10 top-[60px] left-16 right-16 rounded-lg pl-3 '
        />
          
        <Home/>
        
      </ScrollView>
    </SafeAreaView>
    
  )
}

export default search