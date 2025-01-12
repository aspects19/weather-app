import React from 'react';
import { View, Image } from 'react-native';
import { Redirect } from 'expo-router';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import images from "../constants"
import Onboarding from 'react-native-onboarding-swiper';

const Welcome = () => {
  return (
    <View className="h-full">
      
      <Onboarding
        controlStatusBar= {false}
        onDone={() => <Redirect href="home" />}
        pages={[
          {
            backgroundColor: 'blue',
            image: <Image source={require('../assets/images/icon.png')} style={{height: 30,}}/>,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: 'green',
            image: <Image source={require('../assets/images/icon.png')} style={{height: 30}} />,
            title: 'The Title',
            subtitle: 'This is the subtitle that sumplements the title.',
          },
          {
            backgroundColor: '#999',
            image: <Image source={require('../assets/images/icon.png')} style={{height: 30}} />,
            title: 'Triangle',
            subtitle: "Beautiful, isn't it?",
          },
        ]}
      />
    </View>
  )
}

export default Welcome