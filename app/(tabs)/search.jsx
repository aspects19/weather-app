import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import Home from './home';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import getWeather from '../../test';

const Search = () => {
  const [location, setLocation] = useState("");
  const [metricSystem, setMetricSystem] = useState("degrees");

  const handleOnSubmitEditing = async () => {
    if (!location) return;  // Prevents making an empty request
    const WeatherData = await getWeather(location);
    console.log(WeatherData);
    setLocation(""); // Clears the input after submitting
  };

  return (
    <SafeAreaView>
      <ScrollView className="h-full bg-primary">
        <View className="absolute top-[60px] z-10 left-16 right-16">
          <View className="relative w-full">
            <TextInput
              onChangeText={(textchange) => setLocation(textchange)} // Proper event handler for text input
              onSubmitEditing={handleOnSubmitEditing} // Correct invocation of the submit handler
              value={location}
              placeholder="Type a location"
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

        <Home />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
