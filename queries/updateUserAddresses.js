import firestore from "@react-native-firebase/firestore";

export default updateUserAddresses = async (userId, addresses) => {
  const userRef = firestore().collection("Users").doc(userId);
  await userRef.update({ addresses });
};
