import { View, TextInput, Text, Image, Alert, Pressable, ScrollView, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import getWeather from '../../components/getWeather';
import {
  FontAwesome,
  Fontisto,
  Ionicons,
  Feather,
  } from '@expo/vector-icons';

import icons from '../../constants/icons'; //available icons { clearNight, cloudySun, rain, rainySun, thundestorm, sunny, profile, plus,}




const home = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [location, setLocation] = useState("");
  const [weatherDataInfo, setWeatherDataInfo] = useState(
    {
      city: null,
      country: null,
      description: null,
      temperature : null,
      precipitation: null,
    }
  );
  const [ isloading, setIsLoading] = useState(true);

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleDismissModal = () => {
    setModalVisible(false);
  };


  const handleOnSubmitEditing = async () => {
    if (!location) return;
    setIsLoading(true);
    try {
      const WeatherData = await getWeather(location);
      if (WeatherData) {
        setWeatherDataInfo({
          city: WeatherData.localizedName,
          country: WeatherData.countryName,
          description: WeatherData.weatherText,
          temperature : WeatherData.temperature,
          precipitation: WeatherData.precipitationType,
        });
      };
    } catch (err) {
      if (isloading) {
        
      }
    }
      
  };

  const CustomModal = ({ icon, title, text, visible, dismissCallback }) => {
    return (
      <Modal 
        animationType='fade'
        transparent={true}
        visible={visible}
        onRequestClose={dismissCallback}
      >
        <View className='flex-1 justify-center items-center bg-[#0000007e]'>
          <View className='m-5 bg-[#919192] rounded-xl p-3 items-center w-8/12'>
            <Text className='text-lg font-bold text-white mb-2 pl-2'>{icon} {title}</Text>
            <Text className='text-center text-slate-300 mb-4'>{text}</Text>
            <Pressable className='rounded-xl p-3 bg-[#ffe294] ' onPress={dismissCallback}>
              <Text className='text-white font-bold text-center'>Dismiss</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

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
            <View className='flex-1 justify-center items-center'>
              <CustomModal 
                icon={<Text>🔔</Text>}  // Example icon
                title="Alert!"
                text="This is an important message."
                visible={modalVisible}
                dismissCallback={handleDismissModal}
              />
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