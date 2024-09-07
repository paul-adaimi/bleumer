import { doc, getDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";

export default fetchUserOrders = async (userId) => {
  const userRef = doc(db, "Orders", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data().orders || [];
  } else {
    throw new Error("User not found");
  }
};
