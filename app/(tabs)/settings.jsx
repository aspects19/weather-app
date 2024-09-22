import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { setItemAsync ,getItemAsync } from '../../components/asyncStorageReadWrite';
import { FontAwesome, AntDesign, Octicons, Zocial, Ionicons, FontAwesome6, Feather } from '@expo/vector-icons';

import icons from '../../constants/icons';

const Settings = () => {
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [celcius, setCelcius] = useState(true);

  const handleNotificationToggle = () => {
    setNotificationStatus(!notificationStatus);
  };

  const handleCelciusStatus = () => {
    setCelcius(!celcius);
    setItemAsync("celcius", !celcius)
  };

  useEffect(() => {
    const loadCelciusStatus = async () => {
      const storedCelcius = await getItemAsync('celcius');
      if (storedCelcius !== null) {
        setCelcius(storedCelcius);
      }
    };
  
    loadCelciusStatus(); 
  }, []);
  

  const SettingCard = ({ text, IconProvider, icon, toggle, onPress }) => {
    return (
      <TouchableOpacity className="ml-4 mb-3" onPress={onPress}>
        <BlurView
          intensity={80}
          tint="dark"
          className="h-12 w-11/12 pr-3 rounded-[10px] bg-[#4c558679] flex-row justify-between items-center"
        >
          <View className="flex-row items-center px-3">
            <IconProvider name={icon} size={19} color="white" />
            <Text className="text-white ml-3 font-semibold text-[18px]">{text}</Text>
          </View>
          {toggle !== undefined ? (
            toggle ? <FontAwesome6 name="toggle-on" size={24} color="white" /> : <Feather name="toggle-left" size={26} color="white" />
          ) : (
            <Ionicons name="chevron-forward" size={24} color="white" />
          )}
        </BlurView>
      </TouchableOpacity>
    );
  };

  const SocialCard = ({ IconProvider, icon, link }) => {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(link)} className="mx-4 mb-3">
        <BlurView
          intensity={80}
          tint="dark"
          className="h-12 w-12 rounded-[15px] bg-[#4c558679] justify-center items-center"
        >
          <IconProvider name={icon} size={19} color="white" />
        </BlurView>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View className="h-full bg-[#121225] items-center">
        <View className="h-40 w-full bg-[#191935] -mb-7"></View>
        <View className="flex items-center content-center rounded-t-4xl bg-primary">
          <View className="flex items-center content-center h-32 w-32 -top-16 bg-gray-400 rounded-full">
            <Image source={icons.profile} resizeMode="contain" className="h-28 w-28 mt-2 rounded-full" />
            <Text className="text-white mt-4 text-[22px] font-extrabold">aspect dev</Text>
            <Text className="text-slate-400 mt-2 text-[12px] font-semibold">aspect88@gmail.com</Text>
          </View>

          <View className="mt-3">
            <SettingCard IconProvider={FontAwesome} icon="bell-o" text="Turn on notification" toggle={notificationStatus}onPress={handleNotificationToggle} />
            <SettingCard IconProvider={FontAwesome6} icon="temperature-low" text="Use degrees Celcius" toggle={celcius} onPress={handleCelciusStatus} />
            <SettingCard IconProvider={Ionicons} icon="share-social" text="Tell your friends?" onPress={()=>Linking.openURL("https://drive.google.com")}/>
            <SettingCard IconProvider={Octicons} icon="repo" text="Project repo" onPress={()=>Linking.openURL("https://github.com/aspects19/weather-app")} />

            <BlurView intensity={1} tint="dark" className="h-20 w-11/12 mx-4 mr-10 pb-1 pt-3 rounded-[15px] justify-around items-center">
              <Text className="text-slate-200 -ml-9">version : 1.0.1</Text>
              <View className="flex flex-row">
                <Text className="text-slate-400">developer :</Text>
                <Text onPress={() => Linking.openURL("https://github.com/aspects19")} className="text-blue-300 text-sm">aspect19</Text>
              </View>
              <Text className="text-slate-500 text-sm">Built with React Native, Expo and NativeWind</Text>
            </BlurView>
          </View>

          <View className="flex w-11/12 flex-row mt-3">
            <SocialCard IconProvider={Zocial} icon="github" link="https://github.com/aspects19" />
            <SocialCard IconProvider={AntDesign} icon="linkedin-square" link="https://www.linkedin.com/in/jeffarson-amenya-55ba872b9/" />
            <SocialCard IconProvider={FontAwesome6} icon="square-instagram" link="https://www.instagram.com/_americ_inc" />
            <SocialCard IconProvider={FontAwesome6} icon="x-twitter" link="https://www.x.com/americ_inc_" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
