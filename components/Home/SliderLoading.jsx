import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const SliderLoading = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item width={155} height={25} />
      <SkeletonPlaceholder.Item
        marginTop={10}
        flexDirection="row"
        alignItems="center"
      >
        <SkeletonPlaceholder.Item width={300} height={150} borderRadius={20} />
        <SkeletonPlaceholder.Item
          marginLeft={20}
          width={300}
          height={150}
          borderRadius={20}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default SliderLoading;
