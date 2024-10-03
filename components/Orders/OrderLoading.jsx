import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const OrderLoading = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item width={"100%"} height={130} borderRadius={20} />
      <SkeletonPlaceholder.Item
        marginTop={10}
        width={"100%"}
        height={160}
        borderRadius={20}
      />
      <SkeletonPlaceholder.Item
        marginTop={10}
        width={"100%"}
        height={120}
        borderRadius={20}
      />
      <SkeletonPlaceholder.Item
        marginTop={10}
        width={"100%"}
        height={200}
        borderRadius={20}
      />
      <SkeletonPlaceholder.Item
        marginTop={10}
        width={"100%"}
        height={130}
        borderRadius={20}
      />
    </SkeletonPlaceholder>
  );
};

export default OrderLoading;
