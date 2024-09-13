import { View, Text, Image, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';


import icons from '../../constants/icons';

const home = () => {

  const weatherCard = () => {
    return (
      <View>

      </View>
    )
  };

  return (
    <SafeAreaView>
      <View className='h-full bg-black '>
          <View>
            <View className='w-full'>
              
              <ImageBackground
                className=" w-full flex items-center text-center content-center"
                resizeMode="cover"
                source={icons.clearNight}
                blurRadius={100}
                >
                <View className='flex flex-row justify-between px-3 mt-5 w-full'>
                  <FontAwesome name="navicon" size={17} color="white" />
                  <FontAwesome name="calendar" size={17} color="white" />
                </View>
                <Text className="text-white font-semibold text-xl py-4">Nairobi, <Text className="font-normal">Kenya</Text></Text>
                <Image source={icons.clearNight} resizeMode="contain" className="h-40 w-40" />
                <Text className="font-extrabold text-white text-[37px]">29°C</Text>
                <Text className="font-normal text-white text-lg">Expecting some light rain today.</Text>
                <View className="flex flex-row justify-between w-full px-8 pb-6 pt-6">
                  <View className="flex flex-row items-center">
                    <Feather name="wind" size={24} color="white" />
                    <Text className="text-white">11km/hr</Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <Ionicons name="water-outline" size={24} color="white" />
                    <Text className="text-white">02%</Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <Fontisto name="day-sunny" size={24} color="white" />
                    <Text className="text-white">8hr</Text>
                  </View>
                </View>
              </ImageBackground> 
            </View>
            <View>
              <Text className='text-white text-lg pt-3 font-medium pl-2'>🕜 Hourly Forecast</Text>
              <ScrollView horizontal={true}>

              </ScrollView>
            </View>
          </View>

        
      </View>
    </SafeAreaView>
  )
};

export default home