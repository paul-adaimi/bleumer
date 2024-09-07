import { doc, getDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";

export default fetchUserAddresses = async (userId) => {
  const userRef = doc(db, "Users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data().addresses || [];
  } else {
    throw new Error("User not found");
  }
};
