import { db } from "@/configs/FirebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";

export default fetchProducts = async () => {
  const q = query(collection(db, "Products"));
  const querySnapshot = await getDocs(q);

  const products = [];

  querySnapshot.forEach((doc) => {
    const productUuid = doc.id;
    const productData = doc.data();

    products.push({
      id: productUuid,
      ...productData,
    });
  });

  return products;
};
