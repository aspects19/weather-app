import React from 'react';
import { View, Text } from 'react-native';
import { Tabs, usePathname } from 'expo-router';
import { GlobalProvider } from '../../context/tempContext';
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
      <Text className={` w-16 text-center ${focused ? 'text-white' : 'text-gray-400'}`}>{name}</Text>
    </View>
  );
};


const RootLayout = () => {
  const pathname = usePathname();
  const tabBarColor = pathname === '/home' ? '#151320' : '#040515';
  const tabStyles = {
    backgroundColor: tabBarColor,
    height: "100%",
  }
  return (
    < View style={tabStyles}>
      <GlobalProvider>
        <Tabs
          screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#1d1f29",
              height: 50,
              display: "flex",
              marginBottom: 13,
              marginTop: 7,
              borderTopWidth: 0,
              marginHorizontal:16,
              borderRadius: 20,
              paddingBottom: 0,
              paddingTop: 6,
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
      </GlobalProvider>
    </View>
  );
};

export default RootLayout;
