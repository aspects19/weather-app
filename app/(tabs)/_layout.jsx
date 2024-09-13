import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Entypo } from '@expo/vector-icons';


const TabIcon = ({ provider: IconComponent, icon, focused }) => {
  return (
    <View className='flex items-center justify-center gap-2'>
      <IconComponent
        name={icon}
        size={24}
        color={focused ? 'white' : 'grey'}
      />
    </View>
  );
};


const RootLayout = () => {
  return (
    < View className= 'h-full bg-black'>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#403f41",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 60,
            marginBottom: 27,
            marginHorizontal:16,
            borderRadius: 20,
            

            
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
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                provider={Feather} 
                icon="search"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                provider={FontAwesome5} 
                icon="bell"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="maps"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                provider={Entypo} 
                icon="map"
                focused={focused}
              />
            ),
          }}
        />
        
        
      </Tabs>

      <StatusBar backgroundColor="#161622" style="light" />
    </View>
  );
};

export default RootLayout;
