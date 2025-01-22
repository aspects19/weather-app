import { Image, View } from 'react-native';
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { Redirect } from 'expo-router';

import images from '../constants/images';

const NavigateHome = () => {
  return <Redirect href={'/home'} />
  
};

const Welcome = () => (
  <Onboarding
    onDone={() => NavigateHome()}
    pages={[
      {
        backgroundColor: '#151320',
        image: 
          <View className='w-full'>
            <Image resizeMode='cover' source={images.rafiki3} className=' bg-[#151320]' />
          </View>,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#13201c',
        image: 
          <View className='w-full' >
            <Image source={images.pana} className=' bg-[#13201c]' />
          </View>,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#201313',
        image: 
          <View className='w-full' >
            <Image source={images.rafiki3} className=' bg-[#201313]' />
          </View>,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
    ]}
  />
);

export default Welcome;