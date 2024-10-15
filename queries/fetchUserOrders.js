import firestore from "@react-native-firebase/firestore";

export default fetchUserOrders = async (userId) => {
  const userRef = firestore().collection("Orders").doc(userId);
  const userSnap = await userRef.get();

  if (userSnap.exists) {
    const orders = userSnap.data().orders || [];
    return orders.reverse();
  } else {
    throw new Error("User not found");
  }
};
