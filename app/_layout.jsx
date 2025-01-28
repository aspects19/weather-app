import { Stack } from "expo-router";
import React from "react";
import '../global.css';


const RootLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
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