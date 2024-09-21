import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

const SkeletonLoader = ({ width, height, borderRadius }) => {
  return (
    <MotiView
      from={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        type: 'timing',
        duration: 800,
        loop: true,
        repeatReverse: true,
      }}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#d3d3d3', // light grey as a placeholder color
        marginVertical: 5,
      }}
    />
  );
};

const HomeSkeleton = () => {
  return (
    <View style={{ padding: 20 }}>
      {/* Location Input Skeleton */}
      <SkeletonLoader width="100%" height={40} borderRadius={8} />
      {/* Main Weather Info Skeleton */}
      <SkeletonLoader width={150} height={150} borderRadius={75} />
      <SkeletonLoader width="60%" height={30} borderRadius={8} />
      <SkeletonLoader width="40%" height={20} borderRadius={8} />
      {/* Weather Stats Skeleton */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
        <SkeletonLoader width={100} height={50} borderRadius={8} />
        <SkeletonLoader width={100} height={50} borderRadius={8} />
        <SkeletonLoader width={100} height={50} borderRadius={8} />
      </View>
      {/* Hourly Forecast Skeleton */}
      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        <SkeletonLoader width={80} height={100} borderRadius={8} />
        <SkeletonLoader width={80} height={100} borderRadius={8} />
        <SkeletonLoader width={80} height={100} borderRadius={8} />
      </View>
    </View>
  );
};

export default HomeSkeleton;
