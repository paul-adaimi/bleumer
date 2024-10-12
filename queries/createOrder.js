import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";

export default createOrder = async (userId, order) => {
  const userRef = doc(db, "Orders", userId);

  // Check if the document exists
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    await setDoc(userRef, { orders: [] });
  }

  await updateDoc(userRef, {
    orders: arrayUnion(order),
  });
};
