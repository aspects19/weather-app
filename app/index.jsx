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
                Discover joy in every forecast, rain or shine.
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
                Get accurate weather forecasts to start your day right
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
                Stay Ready
              </Text>
              <Text style={styles.onboardSubtitle}>
                Be prepared for any weather with real-time updates.
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
                Know Why 
              </Text>
              <Text style={styles.onboardSubtitle}>
                Understand the weather with detailed explanations.
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
              <Text style={styles.onboardSubtitle}>
              Discover joy in every forecast, rain or shine.
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
    padding: 70,
    backgroundColor: 'transparent', 
  },
  onboardTitle: {
    color: 'white',
    padding: 4,
    textAlign: 'center',
    fontSize: 35,
  },
  onboardSubtitle: {
    color: 'white',
    padding: 4,
    textAlign: 'center',
    fontSize: 20,
  },
});