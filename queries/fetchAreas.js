import firestore from "@react-native-firebase/firestore";

export default fetchAreas = async () => {
  const areasRef = firestore().collection("Areas");
  const querySnapshot = await areasRef.get();

  const areas = [];

  querySnapshot.forEach((doc) => {
    areas.push({ ...doc.data() });
  });

  return areas;
};
