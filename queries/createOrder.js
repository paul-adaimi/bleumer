import firestore from "@react-native-firebase/firestore";

export default createOrder = async (userId, order) => {
  const userRef = firestore().collection("Orders").doc(userId);

  // Check if the document exists
  const docSnap = await userRef.get();
  if (!docSnap.exists) {
    await userRef.set({ orders: [] });
  }

  await userRef.update({
    orders: firestore.FieldValue.arrayUnion(order),
  });
};
