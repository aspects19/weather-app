import { View, TextInput, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import getWeatherAndForecast from '../../components/getWeather';
import { setItemAsync, getItemAsync } from '../../components/asyncStorageReadWrite';
import HomeSkeleton from '../../components/skeleton';
import {useTemperature } from "../../context/tempContext";
import {
  FontAwesome,
  Fontisto,
  Ionicons,
  Feather,
  AntDesign,
  } from '@expo/vector-icons';

const home = () => {
  const [location, setLocation] = useState("");
  const [weatherDataInfo, setWeatherDataInfo] = useState(null);
  const [FocastDataInfo, setFocastDataInfo] = useState(null);
  const [ isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const isFocused = useIsFocused();

  const {isCelcius} = useTemperature();

  useEffect(() => {
    const loadStoredWeatherData = async() => {
      const storedRealtimeData = await getItemAsync("WeatherInfo");
      const storedFocastData = await getItemAsync("hourlyFocasts");
      if (storedRealtimeData != null && storedFocastData != null) {
        setFocastDataInfo(storedRealtimeData);
        setFocastDataInfo(FocastDataInfo);
      }
    };
    
    loadStoredWeatherData();
  }, [])

  const handleOnSubmitEditing = async (location) => {
    if (!location) return console.log("No location", location);
    setIsLoading(true);
    try {
      const {weatherInfo, hourlyForecasts} = await getWeatherAndForecast(location);
      if (weatherInfo && hourlyForecasts) {
        setWeatherDataInfo(weatherInfo);
        setFocastDataInfo(hourlyForecasts);
        setIsLoading(false);
        setItemAsync("weatherInfo", weatherInfo);
        console.log("Set Weather info to local storage");
        
        setItemAsync("hourlyForecasts", hourlyForecasts)
        console.log("Set focast info to local storage");

      } else {
        console.log("No data info");

      }

    } catch (error) {
      setIsLoading(false)
      console.log(`got an error from api call ${error}`);
    };
      
  };

  const WeatherCard = ({time, temperature, icon}) => {
    return (
      <BlurView 
        intensity={80} tint='dark' className='flex items-center rounded-[14px] overflow-hidden h-40 w-28 mt-4 mr-3 py-4 bg-[#4c558679]'>
        <Image resizeMode='contain' source={icon} className='h-12 w-12'/>
        <Text className='text-white text-lg pt-1'>{time}</Text>
        <Text className='text-white text-xl font-semibold'>{isCelcius ? `${Math.round(temperature)} °C` : `${Math.round(temperature*(9/5))} °F`}</Text>
      </BlurView>
    )
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      {isFocused && <StatusBar backgroundColor={"#151320"} style="light" />}
      <View className='h-full bg-primary pl-2'>
        { isloading ? <HomeSkeleton/> : (
            weatherDataInfo===null ? 
            <View className='flex-1 relative'>
              <HomeSkeleton/>
              <SearchModal locationUpdater={setLocation} onSubmit={handleOnSubmitEditing}/>
            </View>
            :
            <View>
              <View className='w-full'>
                
                <View className=" w-full flex items-center text-center content-center pt-6">
                  <View className='flex flex-row justify-between px-3 pt-4 mt-2 w-full'>
                    <FontAwesome name="navicon" size={19} color="white" />
                    <View className="w-8/12">
                      <View className="relative w-full">
                        <TextInput
                          onChangeText={(textchange) => setLocation(textchange)} 
                          onSubmitEditing={()=>handleOnSubmitEditing(location)} 
                          value={location}
                          placeholder="Type your location"
                          placeholderTextColor={"#333941"}
                          cursorColor={"grey"}
                          className="h-9 w-full bg-[#c1c3c5] rounded-lg pl-3 pr-10"
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
                  <Text className="text-white font-semibold text-xl pt-8 mb-3">{weatherDataInfo.name}, <Text className="font-normal">{weatherDataInfo.country}</Text></Text>
                  <Image source={weatherDataInfo.icon} resizeMode="contain" className="h-44 w-48" />
                  <Text className="font-extrabold text-white text-[37px] pt-3">{isCelcius ? `${Math.round(weatherDataInfo.temperature)} °C` : `${Math.round(weatherDataInfo.temperature*(9/5))} °F`} </Text>
                  <Text className="font-normal text-white text-lg">{weatherDataInfo.description}</Text>
                  <View className="flex flex-row justify-between w-full px-8 mb-3 pt-7">
                    <View className="flex flex-row items-center">
                      <Feather name="wind" size={24} color="white" />
                      <Text className="text-white pl-2">{weatherDataInfo.windSpeed} km/h</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Ionicons name="water-outline" size={24} color="white" />
                      <Text className="text-white pl-2">{weatherDataInfo.humidity}</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Fontisto name="day-sunny" size={24} color="white" />
                      <Text className="text-white pl-2">{weatherDataInfo.cloudCover} %</Text>
                    </View>
                  </View>
                  <View className="flex flex-row justify-between w-full px-8 pb-6 pt-2">
                    <View className="flex flex-row items-center">
                      <Ionicons name="rainy-outline" size={24} color="white" /> 
                      <Text className="text-white pl-2">{weatherDataInfo.rainIntensity} mm/h</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <AntDesign name="cloudo" size={24} color="white" />
                      <Text className="text-white pl-2">{weatherDataInfo.cloudCover} %</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Fontisto name="fog" size={18} color="white" />
                      <Text className="text-white pl-2">{weatherDataInfo.visibility} %</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className='flex-1 justify-center items-center'>
              </View>
              <View>
                <Text className='text-white text-xl pt-3 font-semibold pl-2 mb-3 mt-1'>🕜 Hourly Forecast</Text>
                <ScrollView horizontal={true} className=' pb-3 pl-1 '>
                  {
                  FocastDataInfo.map((hour, index) => {
                   return(
                     <WeatherCard 
                       key={index}
                       time={hour.time}
                       temperature={hour.temperature}
                       icon={hour.icon}
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

const SearchModal = ({locationUpdater, onSubmit }) => {
  const [localLocation, setLocalLocation] = useState("");
  
  const handleLocalOnSubmit = (inputLocation) => {
    locationUpdater(inputLocation);
    setLocalLocation("");
    onSubmit(inputLocation);
  };
  
  return (
    <View className='absolute top-0 left-0 right-0 bottom-0 justify-center items-center '>
      <View className='mx-5  bg-[#575757] rounded-xl p-3 items-center w-9/12 h-44 flex justify-between py-5'>
        <Text className='text-lg font-bold text-white mb-2 pl-2'>Type a location</Text>
        <View className=" w-full">
          <TextInput
            className="h-10 w-full bg-[#c1c3c5] rounded-lg pl-3 pr-10 "
            onChangeText={setLocalLocation} 
            onSubmitEditing= {()=>handleLocalOnSubmit(localLocation)} 
            value={localLocation}
            placeholder="Type your location"
            placeholderTextColor={"#333941"}
            cursorColor={"grey"}
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
          <TouchableOpacity className='rounded-xl p-3 bg-[#413c30] '>
            <Text className='text-white font-bold text-center'>Dismiss</Text>
          </TouchableOpacity>
          <TouchableOpacity className='rounded-xl p-3 bg-[#725b1c] ' onPress={() =>handleLocalOnSubmit(localLocation)}>
            <Text className='text-white font-bold text-center'>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default home