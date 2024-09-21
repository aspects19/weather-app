import { View, TextInput, Text, Image, ScrollView, } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getWeather from '../../components/getWeather';
import {
  FontAwesome,
  Fontisto,
  Ionicons,
  Feather,
  AntDesign,
  } from '@expo/vector-icons';

import icons from '../../constants/icons'; //available icons { clearNight, cloudySun, rain, rainySun, thundestorm, sunny, profile, plus,}
import CustomAlert from '../../components/customAlert';
import CustomModal from '../../components/customModal';




const home = () => {
  const [location, setLocation] = useState("");
  const [weatherDataInfo, setWeatherDataInfo] = useState({
      name: null,
      country: null,
      cloudCover: null,
      humidity: null,
      precipitationProbability: null,
      pressure: null,
      rainIntensity: null,
      temperature : null,
      visibility: null,
      windDirection: null,
      windSpeed: null,
    }
  );
  const [ isloading, setIsLoading] = useState(false);

  

  const handleOnSubmitEditing = async () => {
    if (!location) return;
    setIsLoading(true);
    setLocation("");
    try {
      const WeatherData = await getWeather(location);
      if (WeatherData) {
        setWeatherDataInfo({
          name: WeatherData.name,
          country: WeatherData.country,
          cloudCover: WeatherData.cloudCover,
          humidity: WeatherData.humidity,
          precipitationProbability: WeatherData.precipitationProbability,
          pressure: WeatherData.pressure,
          rainIntensity: WeatherData.rainIntensity,
          temperature : WeatherData.temperature,
          visibility: WeatherData.visibility,
          windDirection: WeatherData.windDirection,
          windSpeed: WeatherData.windSpeed,
        });
      };
    } catch (error) {
      return (
        <CustomAlert 
          title={"⚠️ Error"}
          text={"An error occured and we were unable to fetch weather info."}
        />  
      )
    };
      
  };


  const WeatherCard = () => {
    return (
      
        <BlurView 

          intensity={80} tint='dark' className='flex items-center rounded-lg overflow-hidden h-32 w-24 mt-4 mr-3 py-4 bg-[#4c558679]'>
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
            <View className='w-full '>
              
              <View className=" w-full flex items-center text-center content-center">
                <View className='flex flex-row justify-between px-3 pt-4 mt-2 w-full'>
                  <FontAwesome name="navicon" size={19} color="white" />
                  <View className="w-8/12">
                    <View className="relative w-full">
                      <TextInput
                        onChangeText={(textchange) => setLocation(textchange)} 
                        onSubmitEditing={handleOnSubmitEditing} 
                        value={location}
                        placeholder="Type your location"
                        placeholderTextColor={"#333941"}
                        cursorColor={"grey"}
                        className="h-8 w-full bg-[#c1c3c5] rounded-lg pl-3 pr-10"
                      />
                      <Feather
                        name="search"
                        size={20}
                        color="black"
                        style={{
                          position: "absolute",
                          right: 9,
                          top: "50%",
                          transform: [{ translateY: -12 }],
                        }}
                      />
                    </View>
                  </View>
                  <FontAwesome name="calendar" size={19} color="white" />
                </View>
                <Text className="text-white font-semibold text-xl py-4 pt-8">{weatherDataInfo.name}<Text className="font-normal">{` ${weatherDataInfo.country}`}</Text></Text>
                <Image source={icons.clearNight} resizeMode="contain" className="h-48 w-48" />
                <Text className="font-extrabold text-white text-[37px] pt-3">29°C</Text>
                <Text className="font-normal text-white text-lg">Expecting some light rain today.</Text>
                <View className="flex flex-row justify-between w-full px-8 mb-3 pt-7">
                  <MotiView 
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'timing' }}
                    className="flex flex-row items-center">
                    <Feather name="wind" size={24} color="white" />
                    <Text className="text-white pl-2">11km/hr</Text>
                  </MotiView>
                  <View className="flex flex-row items-center">
                    <Ionicons name="water-outline" size={24} color="white" />
                    <Text className="text-white pl-2">02%</Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <Fontisto name="day-sunny" size={24} color="white" />
                    <Text className="text-white pl-2">8hr</Text>
                  </View>
                </View>
                <View className="flex flex-row justify-between w-full px-8 pb-6 pt-2">
                  <View className="flex flex-row items-center">
                    <Ionicons name="rainy-outline" size={24} color="white" /> 
                    <Text className="text-white pl-2">11</Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <AntDesign name="cloudo" size={24} color="white" />
                    <Text className="text-white pl-2">02%</Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <Fontisto name="fog" size={18} color="white" />
                    <Text className="text-white pl-2">20</Text>
                  </View>
                </View>
              </View>
            </View>
            <View className='flex-1 justify-center items-center'>
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