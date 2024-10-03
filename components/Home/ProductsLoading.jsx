import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const ProductsLoading = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item
        marginTop={20}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <SkeletonPlaceholder.Item width={100} height={25} />
        <SkeletonPlaceholder.Item marginRight={20} width={75} height={15} />
      </SkeletonPlaceholder.Item>

      <SkeletonPlaceholder.Item
        marginTop={10}
        flexDirection="row"
        alignItems="center"
      >
        <SkeletonPlaceholder.Item width={220} height={200} borderRadius={20} />
        <SkeletonPlaceholder.Item
          marginLeft={20}
          width={220}
          height={200}
          borderRadius={20}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default ProductsLoading;
