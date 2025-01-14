import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import '../global.css';


const RootLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </Stack>
    </>
  );
}


export default RootLayout