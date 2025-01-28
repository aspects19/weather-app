import { View, Text, Image, TouchableOpacity, Linking, TextInput, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { setItemAsync ,getItemAsync } from '../../components/asyncStorageReadWrite';
import { FontAwesome, AntDesign, Octicons, Zocial, Ionicons, FontAwesome6, Feather, Entypo } from '@expo/vector-icons';
import { useTemperature } from '../../context/tempContext';
import icons from '../../constants/icons';
import { useIsFocused } from '@react-navigation/native';

const Settings = () => {
  const [notificationStatus, setNotificationStatus] = useState(false);
  const {isCelcius, setIsCelcius} = useTemperature();
  const [profileName, setProfileName] = useState('Aspect');
  const [profileEmail, setProfileEmail] = useState('name@example.com');
  const [profileImage, setProfileImage] = useState(icons.profile);
  const isFocused = useIsFocused();

  const handleNotificationToggle = () => {
    setNotificationStatus(!notificationStatus);
  };

  const handleCelciusStatus = () => {
    setIsCelcius(!isCelcius);
    setItemAsync("celcius", !isCelcius)
  };

  useEffect(() => {
    const loadCelciusStatus = async () => {
      const storedCelcius = await getItemAsync('celcius');
      if (storedCelcius !== null) {
        setIsCelcius(storedCelcius);
      }
    };

    const loadProfilePic = async () => {
      const storedProfilePic = await getItemAsync('profilePic');
      if (storedProfilePic !== null) {
        setProfileImage(storedProfilePic);
      }
    };

    const loadProfileName = async () => {
      const storedProfileName = await getItemAsync('name');
      if (storedProfileName !== null) {
        setProfileName(storedProfileName);
      }
    };

    const loadProfileEmail = async () => {
      const storedProfileEmail = await getItemAsync('email');
      if (storedProfileEmail !== null) {
        setProfileEmail(storedProfileEmail);
      }
    };

    loadCelciusStatus();
    loadProfilePic();
    loadProfileName();
    loadProfileEmail();

  }, []);
  
  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setItemAsync('profilePic', result.assets[0].uri);
    }
  };
  const SettingCard = ({ text, IconProvider, icon, toggle, onPress }) => {
    return (
      <TouchableOpacity className="ml-4 mb-3 rounded-4xl" onPress={onPress}>
        <BlurView
          intensity={10}
          tint="light"
          className="h-14 w-11/12 pr-3 rounded-[15px]  flex-row justify-between items-center"
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
      <TouchableOpacity onPress={() => Linking.openURL(link)} className="mx-4 mb-3 rounded-[80px]">
        <BlurView
          intensity={10}
          tint="light"
          className="h-14 w-14 rounded-[10px] bg-[#4c558679] justify-center items-center"
        >
          <IconProvider name={icon} size={20} color="white" />
        </BlurView>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView > 
      {isFocused && <StatusBar backgroundColor={"#040515"} style="light" />}
      <View className="h-full bg-[#040515] items-center mb-1">
        <View className="h-40 w-full bg-[#040515] -mb-7"></View>
        <View className="flex items-center content-center rounded-t-4xl bg-[#0b0c1d]">
          <View className="flex items-center content-center h-32 w-32 -top-16 bg-gray-400 rounded-full">
            <Image source={ profileImage} resizeMode="contain" className="h-28 w-28 mt-2 rounded-full" />
            <Entypo name='edit' size={13} color='white' onPress={PickImage} style={{margin:0, marginTop:-10, marginLeft:39}}/>
            <View className="flex flex-row items-end ">
              <TextInput
                value={profileName}
                onChangeText={setProfileName}
                className="text-white mt-4 text-[22px] font-extrabold"
                onSubmitEditing={() => {
                  setItemAsync('name', profileName);
                  Keyboard.dismiss();
                }}
              />
              <Entypo name='edit' size={6} color='white' style={{paddingBottom: 13}} />
            </View>
            <View className="flex flex-row items-end">
              <TextInput
                value={profileEmail}
                onChangeText={setProfileEmail}
                className="text-slate-400  text-[12px] font-semibold"
                onSubmitEditing={() => {
                  setItemAsync('email', profileEmail);
                  Keyboard.dismiss();
                }}
              />
              <Entypo name='edit' size={6} color='white' style={{paddingBottom: 10}} />
            </View>
          </View>

          <View className="mt-16 flex items-center content-center px-4 ">
            <SettingCard IconProvider={FontAwesome} icon="bell-o" text="Turn on notification" toggle={notificationStatus} onPress={handleNotificationToggle} />
            <SettingCard IconProvider={FontAwesome6} icon="temperature-low" text="Use degrees Celcius" toggle={isCelcius} onPress={handleCelciusStatus} />
            <SettingCard IconProvider={Ionicons} icon="share-social" text="Tell your friends?" onPress={() => Linking.openURL("https://github.com/aspects19/weather-app/releases")} />
            <SettingCard IconProvider={Octicons} icon="repo" text="Project repo" onPress={() => Linking.openURL("https://github.com/aspects19/weather-app")} />

            <BlurView intensity={1} tint="dark" className="h-20 w-11/12 mx-4 mr-10 pb-1 pt-3 rounded-[15px] justify-around items-center flex">
              <Text className="text-slate-200 -ml-9">version : 1.0.1</Text>
              <View className="flex flex-row">
                <Text className="text-slate-400">developer :</Text>
                <Text onPress={() => Linking.openURL("https://github.com/aspects19")} className="text-blue-300 text-sm underline pl-2">aspect19</Text>
              </View>
              <Text className="text-slate-500 text-sm text-center w-full">Built with React Native, Expo and NativeWind</Text>
            </BlurView>
          </View>

          <View className="flex w-11/12 flex-row mt-4 mb-3">
            <SocialCard IconProvider={Zocial} icon="github" link="https://github.com/aspects19" />
            <SocialCard IconProvider={AntDesign} icon="linkedin-square" link="https://www.linkedin.com/in/jeffarson-amenya-55ba872b9/" />
            <SocialCard IconProvider={FontAwesome6} icon="square-instagram" link="https://www.instagram.com/americ_inc" />
            <SocialCard IconProvider={FontAwesome6} icon="x-twitter" link="https://www.x.com/americ_inc_" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings
