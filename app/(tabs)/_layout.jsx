import React from 'react';
import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';


const TabIcon = ({ provider: IconComponent, icon, focused,name }) => {
  return (
    <View className='flex items-center justify-center'>
      <IconComponent
        name={icon}
        size={24}
        color={focused ? 'white' : 'grey'}
      />
      <Text className={focused ? 'text-white' : ' text-gray-400'}>{name}</Text>
    </View>
  );
};


const RootLayout = () => {
  return (
    < View className= 'h-full bg-primary'>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#1d1f29",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 50,
            marginBottom: 16,
            marginTop: 7,
            marginHorizontal:16,
            borderRadius: 20,
            paddingHorizontal: 10
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                provider={Feather} 
                icon="home"
                focused={focused}
                name={"home"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                provider={Ionicons} 
                icon="settings-outline"
                focused={focused}
                name={"settings"}
              />
            ),
          }}
        />
        
      </Tabs>

      <StatusBar backgroundColor="#161622" style="light"  />
    </View>
  );
};

export default RootLayout;
