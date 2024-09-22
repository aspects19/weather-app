import React from 'react';
import { View } from 'react-native';
import { MotiView, ScrollView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

const SkeletonLoader = ({ width, height, borderRadius, padding }) => {
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
  const Spacer = ({ height = 16, width = 16 }) => <View style={{ height, width }} />;
  return (
    <SafeAreaView className='h-full '>
      <MotiView 
        transition={{
          type: 'timing',
          repeatReverse: false,
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
          <Spacer height={36}/>
          <SkeletonLoader width={140} height={30} borderRadius={8} />
          <Spacer height={30}/>
          <SkeletonLoader width={170} height={150} borderRadius={30} />
          <Spacer height={40}/>
          <SkeletonLoader width={110} height={40} borderRadius={4} />
          <Spacer height={34}/>
          <View className='flex flex-row w-11/12 justify-between px-9 mb-4'>
            <SkeletonLoader width={60} height={35} borderRadius={8} />
            <SkeletonLoader width={60} height={35} borderRadius={8} />
            <SkeletonLoader width={60} height={35} borderRadius={8} />
          </View>
          <View className='flex flex-row w-11/12 justify-between px-9 mb-4'>
            <SkeletonLoader width={60} height={35} borderRadius={8} />
            <SkeletonLoader width={60} height={35} borderRadius={8} />
            <SkeletonLoader width={60} height={35} borderRadius={8} />
          </View>
          <Spacer height={45} />
          <ScrollView horizontal={true} className='flex flex-row w-full '>
            <Spacer width={15} />
            <SkeletonLoader width={100} height={120} borderRadius={8} />
            <Spacer width={30} />
            <SkeletonLoader width={100} height={120} borderRadius={8} />
            <Spacer width={30} />
            <SkeletonLoader width={100} height={120} borderRadius={8} />
          </ScrollView>
        </View>
      </MotiView>
    </SafeAreaView>
  );
};

export default HomeSkeleton;
