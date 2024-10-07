import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";

export default updateUserAddresses = async (userId, addresses) => {
  const userRef = doc(db, "Users", userId);
  await updateDoc(userRef, { addresses });
};
