import firestore from "@react-native-firebase/firestore";

export default fetchProducts = async () => {
  const productsRef = firestore().collection("Products");
  const querySnapshot = await productsRef.get();

  const products = [];

  querySnapshot.forEach((doc) => {
    const productUuid = doc.id;
    const productData = doc.data();

    products.push({
      id: productUuid,
      ...productData,
    });
  });

  products.sort((a, b) => a.name.localeCompare(b.name));

  return products;
};
