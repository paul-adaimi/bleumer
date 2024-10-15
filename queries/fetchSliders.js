import firestore from "@react-native-firebase/firestore";

export default fetchSliders = async () => {
  const slidersRef = firestore().collection("Slider");
  const querySnapshot = await slidersRef.get();

  const sliders = [];

  querySnapshot.forEach((doc) => {
    sliders.push({ ...doc.data() });
  });

  return sliders;
};
