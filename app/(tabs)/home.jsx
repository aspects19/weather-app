import { View, TextInput, Text, Image, ScrollView, BackHandler, Modal, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import getWeatherAndForecast from '../../components/getWeather';
import { setItemAsync, getItemAsync } from '../../components/asyncStorageReadWrite';
import HomeSkeleton from '../../components/skeleton';
import {
  FontAwesome,
  Fontisto,
  Ionicons,
  Feather,
  AntDesign,
  } from '@expo/vector-icons';

import icons from '../../constants/icons'; 
import CustomAlert from '../../components/customAlert';


const home = () => {
  const [location, setLocation] = useState("");
  const [weatherDataInfo, setWeatherDataInfo] = useState(null);
  const [FocastDataInfo, setFocastDataInfo] = useState(null);
  const [ isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  

  const handleOnSubmitEditing = async () => {
    if (!location) return;
    setIsLoading(true);
    setLocation("");
    try {
      const {weatherInfo, hourlyForecasts} = await getWeatherAndForecast(location);
      
      if (weatherInfo && hourlyForecasts) {
        setWeatherDataInfo(weatherInfo);
        setFocastDataInfo(hourlyForecasts);
        setIsLoading(false);
        setItemAsync("weatherInfo", weatherInfo);
        setItemAsync("hourlyForecasts", hourlyForecasts)
      };
    } catch (error) {
      setIsLoading(false)
      return (
        <CustomAlert 
          title={"⚠️ Error"}
          text={"An error occured and we were unable to fetch weather info."}
        />  
      )
    };
      
  };

  useEffect(() => {
    const loadStoredWeatherData = async() => {
      const storedRealtimeData = await getItemAsync("WeatherInfo");
      const storedFocastData = await getItemAsync("hourlyFocasts");
      if (storedRealtimeData != null && storedFocastData != null) {
        setFocastDataInfo(storedRealtimeData);
        setFocastDataInfo(FocastDataInfo);
      }
      loadStoredWeatherData();
    }
  }, [])

  const SearchModal = () => {
    const [visible, setVisible] = useState(true);

    const dismissCallback = () => {
      BackHandler.exitApp();
      setVisible(false);
    };
    return (
      <Modal 
        animationType='fade'
        transparent={true}
        visible={visible}
        onRequestClose={dismissCallback}
      >
        <View className='flex-1 justify-center items-center bg-[#0000007e]'>
          <View className='m-5 bg-[#575757] rounded-xl p-3 items-center w-9/12 h-44 flex justify-between py-5'>
            <Text className='text-lg font-bold text-white mb-2 pl-2'>Type a location</Text>
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
            <View className='flex flex-row justify-around w-full mt-4'>
              <TouchableOpacity className='rounded-xl p-3 bg-[#413c30] ' onPress={dismissCallback}>
                <Text className='text-white font-bold text-center'>Dismiss</Text>
              </TouchableOpacity>
              <TouchableOpacity className='rounded-xl p-3 bg-[#725b1c] ' onPress={handleOnSubmitEditing}>
                <Text className='text-white font-bold text-center'>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const WeatherCard = ({time, temperature, icon}) => {
    return (
      <BlurView 
        intensity={80} tint='dark' className='flex items-center rounded-lg overflow-hidden h-32 w-24 mt-4 mr-3 py-4 bg-[#4c558679]'>
        <Image resizeMode='contain' source={icon} className='h-12 w-12'/>
        <Text className='text-white text-lg pt-1'>{time}</Text>
        <Text className='text-white text-xl font-semibold'>{temperature}</Text>
      </BlurView>
    )
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#161622" style="light" />
      <View className='h-full bg-primary pl-2'>
        { isloading ? <HomeSkeleton/> : (
            weatherDataInfo===null ? 
            <>
              <HomeSkeleton/>
              <SearchModal />
            </>
            :
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
                  <Text className="text-white font-semibold text-xl py-4 pt-8">{weatherDataInfo.name}<Text className="font-normal">{weatherDataInfo.country}</Text></Text>
                  <Image source={icons.clearNight} resizeMode="contain" className="h-48 w-48" />
                  <Text className="font-extrabold text-white text-[37px] pt-3">{weatherDataInfo.temperature}</Text>
                  <Text className="font-normal text-white text-lg">Expecting some light rain today.</Text>
                  <View className="flex flex-row justify-between w-full px-8 mb-3 pt-7">
                    <View className="flex flex-row items-center">
                      <Feather name="wind" size={24} color="white" />
                      <Text className="text-white pl-2">{weatherDataInfo.windSpeed}</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Ionicons name="water-outline" size={24} color="white" />
                      <Text className="text-white pl-2">{weatherDataInfo.humidity}</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Fontisto name="day-sunny" size={24} color="white" />
                      <Text className="text-white pl-2">{weatherDataInfo.cloudCover}</Text>
                    </View>
                  </View>
                  <View className="flex flex-row justify-between w-full px-8 pb-6 pt-2">
                    <View className="flex flex-row items-center">
                      <Ionicons name="rainy-outline" size={24} color="white" /> 
                      <Text className="text-white pl-2">{weatherDataInfo.rainIntensity}</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <AntDesign name="cloudo" size={24} color="white" />
                      <Text className="text-white pl-2">{weatherDataInfo.cloudCover}</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Fontisto name="fog" size={18} color="white" />
                      <Text className="text-white pl-2">{weatherDataInfo.visibility}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className='flex-1 justify-center items-center'>
              </View>
              <View>
                <Text className='text-white text-xl pt-3 font-semibold pl-2'>🕜 Hourly Forecast</Text>
                <ScrollView horizontal={true} className='pb-5 pl-1 '>
                  {
                  FocastDataInfo.map((hour, index) => {
                   return(
                     <WeatherCard 
                       key={index}
                       time={hour.time}
                       temperature={hour.temperature}
                       icon={hour.weatherIcon}
                     />
                   )
                 })
                  }
                </ScrollView>
                </View>
            </View> 
          ) 
        } 
      </View>
    </SafeAreaView>
  )
};

export default home