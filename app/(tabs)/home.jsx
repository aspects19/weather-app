import { View, TextInput, Text, Image, ScrollView, BackHandler, Modal, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import getWeather from '../../components/getWeather';
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
  const [ isloading, setIsLoading] = useState(true);

  

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
        { weatherDataInfo.name===null ? 
        <>
           <HomeSkeleton/>
           <SearchModal />
        </>
        : (isloading ? <Skeleton/> :
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
                  <Text className="text-white font-semibold text-xl py-4 pt-8">Wendani, <Text className="font-normal">Nairobi</Text></Text>
                  <Image source={icons.clearNight} resizeMode="contain" className="h-48 w-48" />
                  <Text className="font-extrabold text-white text-[37px] pt-3">29°C</Text>
                  <Text className="font-normal text-white text-lg">Expecting some light rain today.</Text>
                  <View className="flex flex-row justify-between w-full px-8 mb-3 pt-7">
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
                  {hourlyData.map((hour, index) => {
                    const time = new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const temperature = Math.round(hour.values.temperature);
                    const weatherIcon = weatherCodeToIcon(hour.values.weatherCode);
                    return(
                      <WeatherCard 
                        key={index}
                        time={time}
                        temperature={temperature}
                        icon={weatherIcon}
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