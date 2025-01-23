import { Image, View, Text } from 'react-native';
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { Redirect } from 'expo-router';
import { SvgUri } from 'react-native-svg';

import images from '../constants/images';
import svgs from '../constants/svgs';

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
          <View className=' fixed w-full h-full bg-white p-0 m-0 top-0 left-0 bottom-0 right-0'>
            <svgs.onboard_1 className='bg-slate-50'/>
            <Text className='color-emerald-600'>Placeholder text</Text>
          </View>,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#151320',
        image: 
          <View className='w-full h-full'>
            <svgs.onboard_2 />
          </View>,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#151320',
        image: 
          <View className='w-full h-full'>
            <svgs.onboard_3 />
          </View>,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#151320',
        image: 
          <View className='w-full h-full'>
            <svgs.onboard_4 />
          </View>,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#151320',
        image: 
          <View className='w-full h-full'>
            <svgs.onboard_5 />
          </View>,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      
    ]}
  />
);

export default Welcome;