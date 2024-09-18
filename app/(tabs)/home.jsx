import { View, Text, Image, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  FontAwesome,
  Fontisto,
  Ionicons,
  Feather,
  } from '@expo/vector-icons';

import icons from '../../constants/icons';


const home = () => {

  const [weatherDataInfo, setWeatherDataInfo] = useState(null);
  const [ isloading, setIsLoading] = useState(false);

  const { weatherData } = useLocalSearchParams();


  const WeatherCard = () => {
    return (
      
        <BlurView intensity={80} tint='dark' className='flex items-center rounded-lg overflow-hidden h-32 w-24 mt-4 mr-3 py-4 bg-[#4c558679]'>
          <Image resizeMode='contain' source={icons.clearNight} className='h-12 w-12'/>
          <Text className='text-white text-lg pt-1'>Now</Text>
          <Text className='text-white text-xl font-semibold'>29°C</Text>
        </BlurView>
      
    )
  };

  return (
    <SafeAreaView>
      <View className='h-full bg-primary pl-2'>
          <View>
            <View className='w-full'>
              
              <View className=" w-full flex items-center text-center content-center">
                <View className='flex flex-row justify-between px-3 pt-4 mt-2 w-full'>
                  <FontAwesome name="navicon" size={19} color="white" />
                  <FontAwesome name="calendar" size={19} color="white" />
                </View>
                <Text className="text-white font-semibold text-xl py-4 pt-8">Nairobi, <Text className="font-normal">Kenya</Text></Text>
                <Image source={icons.clearNight} resizeMode="contain" className="h-48 w-48" />
                <Text className="font-extrabold text-white text-[37px] pt-3">29°C</Text>
                <Text className="font-normal text-white text-lg">Expecting some light rain today.</Text>
                <View className="flex flex-row justify-between w-full px-8 pb-6 pt-7">
                  <View className="flex flex-row items-center">
                    <Feather name="wind" size={24} color="white" />
                    <Text className="text-white pl-2">11km/hr</Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <Ionicons name="water-outline" size={24} color="white" />
                    <Text className="text-white pl-2">02%</Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <Fontisto name="day-sunny" size={24} color="white" />
                    <Text className="text-white pl-2">8hr</Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text className='text-white text-xl pt-3 font-semibold pl-2'>🕜 Hourly Forecast</Text>
              <ScrollView horizontal={true} className='pb-5 pl-1 '>
                <WeatherCard/>
                <WeatherCard/>
                <WeatherCard/>
                <WeatherCard/>
                <WeatherCard/>
              </ScrollView>
              </View>
          </View>

        
      </View>
    </SafeAreaView>
  )
};

export default home