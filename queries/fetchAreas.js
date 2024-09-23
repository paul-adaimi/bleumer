import { db } from "@/configs/FirebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";

export default fetchAreas = async () => {
  const q = query(collection(db, "Areas"));
  const querySnapshot = await getDocs(q);

  const areas = [];

  querySnapshot.forEach((doc) => {
    areas.push({ ...doc.data() });
  });

  return areas;
};
