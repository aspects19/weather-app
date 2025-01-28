import { Image, View, Text, useWindowDimensions, Alert, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Redirect, router } from 'expo-router';
import { getItemAsync, setItemAsync } from '../components/asyncStorageReadWrite';

import images from '../constants/images';
import svgs from '../constants/svgs';


const Welcome = () => {
  let {width, height} = useWindowDimensions();
  height = height - 10;

  const [onboardDone, setOnboardDone] = useState(false);

  // useEffect(() => {
  //   const checkOnboardStatus = async () => {
  //     const onboardStatus = await getItemAsync('onboardStatus');
  //     if (onboardStatus !== null) {
  //       setOnboardDone(onboardStatus);
  //     }
  //   };
  //   checkOnboardStatus();
  // }, []);

  if (onboardDone) {
    return(
    <Redirect href={'/home'} />
    )
  };
  
  return (
  <Onboarding
    onDone={() => {
      setOnboardDone(true);
      setItemAsync('onboardStatus', true);
    }}
    onSkip={() => {
      setOnboardDone(true);
      setItemAsync('onboardStatus', true);
    }}

    pages={[
      {
        backgroundColor: 'black',
        image:( 
          <View style={styles.onboardImageContainer}>
            <svgs.onboard_1 width={width} height={height} />
            <View style={styles.onboardTextWrapper}>
              <Text style={styles.onboardTitle} className='text-4xl'>
               Stay Ready
              </Text>
              <Text style={styles.onboardSubtitle}>
              Real-time updates ensure you're never caught off guard. Stay prepared for sudden rain, temperature drops, or clear skies with just a glance.
              </Text>
            </View>
          </View>
        ),
        title: '',
        subtitle: '',
      },
      {
        backgroundColor: 'black',
        image: ( 
          <View style={styles.onboardImageContainer}>
            <svgs.onboard_2 width={width} height={height} />
            <View style={styles.onboardTextWrapper}>
              <Text style={styles.onboardTitle}>
                Plan Ahead
              </Text>
              <Text style={styles.onboardSubtitle}>
              Start every day with confidence by checking precise weather forecasts. Know exactly what to expect before heading out, whether it’s sunshine or storms.
              </Text>
            </View>
          </View>
        ),
        title: '',
        subtitle: '',
      },
      {
        backgroundColor: 'black',
        image: ( 
          <View style={styles.onboardImageContainer}>
            <svgs.onboard_3 width={width} height={height} />
            <View style={styles.onboardTextWrapper}>
              <Text style={styles.onboardTitle}>
                Know Why
              </Text>
              <Text style={styles.onboardSubtitle}>
                Dive deeper into the weather. Learn about conditions with detailed forecasts and explanations, so you always understand what’s happening around you.
              </Text>
            </View>
          </View>
        ),
        title: '',
        subtitle: '',
      },
      {
        backgroundColor: 'black',
        image: ( 
          <View style={styles.onboardImageContainer}>
            <svgs.onboard_4 width={width} height={height} />
            <View style={styles.onboardTextWrapper}>
              <Text style={styles.onboardTitle}>
               Stay Connected
              </Text>
              <Text style={styles.onboardSubtitle}>
                Stay informed wherever life takes you. Get live weather updates on the go, whether you’re shopping, traveling, or running errands.
              </Text>
            </View>
          </View>
        ),
        title: '',
        subtitle: '',
      },
      {
        backgroundColor: 'black',
        image: ( 
          <View style={styles.onboardImageContainer}>
            <svgs.onboard_5 width={width} height={height} />
            <View style={styles.onboardTextWrapper}>
              <Text style={styles.onboardTitle}>
                Enjoy Every Moment
              </Text>
              <Text style={styles.onboardSubtitle} className=' color-[#bdc4ea]'>
                Find joy in every moment, rain or shine. Let our app brighten your day with reliable forecasts that keep you smiling through any weather.
              </Text>
            </View>
          </View>
        ),
        title: '',
        subtitle: '',
      },
      
    ]}
  />
  )
};

export default Welcome;

const styles = StyleSheet.create({
  onboardImageContainer : { 
    position: 'relative', 
    width: '100%', 
    height: '100%', 
    backgroundColor: '#2d3748', 
    marginBottom: 45,
  },
  onboardTextWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    paddingTop: 90,
    backgroundColor: 'transparent', 
  },
  onboardTitle: {
    color: '#8995d9',
    padding: 4,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 35,
  },
  onboardSubtitle: {
    color: '#bdc4ea',
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 20,
  },
});