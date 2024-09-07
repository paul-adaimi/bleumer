import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";

export default deleteUserAddress = async (userId, index) => {
  const userRef = doc(db, "Users", userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  const addresses = userData.addresses || [];
  addresses.splice(index, 1);
  await updateDoc(userRef, { addresses });
};
