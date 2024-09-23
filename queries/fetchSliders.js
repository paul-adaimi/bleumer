import { db } from "@/configs/FirebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";

export default fetchSliders = async () => {
  const q = query(collection(db, "Slider"));
  const querySnapshot = await getDocs(q);

  const sliders = [];

  querySnapshot.forEach((doc) => {
    sliders.push({ ...doc.data() });
  });

  return sliders;
};
