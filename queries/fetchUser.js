import firestore from "@react-native-firebase/firestore";

export default fetchUser = async (userId) => {
  const userRef = firestore().collection("Users").doc(userId);
  const userSnap = await userRef.get();

  if (userSnap.exists) {
    return userSnap.data();
  } else {
    throw new Error("User not found");
  }
};
