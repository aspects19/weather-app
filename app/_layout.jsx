import { Stack } from "expo-router";
import React from "react";
import '../global.css';


const RootLayout = () => {
  return (
    <>
      <Stack
        detachInactiveScreens={false}
        screenOptions={{
          headerShown: false,
          presentation: "transparentModal",
          contentStyle: {
            backgroundColor: "#151320",
          },
        }}>
        <Stack.Screen name="index"  />
        <Stack.Screen name="(tabs)"  />
      </Stack>
    </>
  );
}


export default RootLayout