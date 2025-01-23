import { Image, View, Text, useWindowDimensions } from 'react-native';
import React, {useState, useEffect} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Redirect } from 'expo-router';

import images from '../constants/images';
import svgs from '../constants/svgs';



const NavigateHome = () => {
  return <Redirect href={'/home'} />
  
};

const Welcome = () => {
  const {width, height} = useWindowDimensions();
  return (
  <Onboarding
    onDone={() => {}}
    pages={[
      {
        backgroundColor: 'black',
        image: 
          <View className=' fixed w-full h-full bg-white p-0 m-0 top-0 left-0 bottom-0 right-0'>
            <svgs.onboard_2  width={width} height={height} />
          </View>,
        title: '',
        subtitle: '',
      },
      {
        backgroundColor: 'black',
        image: 
          <View className='w-full h-full'>
            <svgs.onboard_1 width={width} height={height} />
          </View>,
        title: '',
        subtitle: '',
      },
      {
        backgroundColor: 'black',
        image: 
          <View className='w-full h-full'>
            <svgs.onboard_3 width={width} height={height} />
          </View>,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: 'black',
        image: 
          <View className='w-full h-full'>
            <svgs.onboard_4 width={width} height={height} />
          </View>,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: 'black',
        image: 
          <View className='w-full h-full'>
            <svgs.onboard_5 width={width} height={height} />
          </View>,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      
    ]}
  />
  )
};

export default Welcome;