import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";

export default createOrder = async (userId, { cart, total }, address) => {
  const userRef = doc(db, "Orders", userId);

  // Check if the document exists
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    await setDoc(userRef, { orders: [] });
  }

  const order = {
    cart,
    orderTime: new Date().toISOString(),
    address: address,
    total,
  };

  await updateDoc(userRef, {
    orders: arrayUnion(order),
  });
};
