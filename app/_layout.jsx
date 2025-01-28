import { Stack } from "expo-router";
import React from "react";


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