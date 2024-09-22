import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import SkeletonExpo from 'moti/build/skeleton/expo';
import { Skeleton } from 'moti/skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

const SkeletonLoader = ({ width, height, borderRadius }) => {
  return (
    <Skeleton 
      colorMode='dark' 
      radius={borderRadius}
      height={height}
      width={width}
      style={{marginBottom: 10}}
    />
    
  );
};

const HomeSkeleton = () => {
  const Spacer = ({ height = 16 }) => <View style={{ height }} />;
  return (
    <SafeAreaView className='h-full '>
      <MotiView 
        transition={{
          type: 'timing'
        }}
        style={{
          height: '100%'
        }}>
        <View className='flex items-center' >
          <View className='flex flex-row w-full justify-between px-2'>
            <SkeletonLoader width={40} height={40} borderRadius={8} />
            <SkeletonLoader width={240} height={40} borderRadius={8} />
            <SkeletonLoader width={40} height={40} borderRadius={8} />
          </View>
          <Spacer height={8}/>
          <SkeletonLoader width={150} height={150} borderRadius={75} />
          <SkeletonLoader width="60%" height={30} borderRadius={8} />
          <SkeletonLoader width="40%" height={20} borderRadius={8} />
          <View className='flex flex-row'>
            <SkeletonLoader width={100} height={50} borderRadius={8} />
            <SkeletonLoader width={100} height={50} borderRadius={8} />
            <SkeletonLoader width={100} height={50} borderRadius={8} />
          </View>
          <View className='flex flex-row'>
            <SkeletonLoader width={80} height={100} borderRadius={8} />
            <SkeletonLoader width={80} height={100} borderRadius={8} />
            <SkeletonLoader width={80} height={100} borderRadius={8} />
          </View>
        </View>
      </MotiView>
    </SafeAreaView>
  );
};

export default HomeSkeleton;
