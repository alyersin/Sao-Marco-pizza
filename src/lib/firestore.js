import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { auth } from "./firebase";

export const saveOrderToHistory = async (cart, totalAmount) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");

    const orderData = {
      userId: user.uid,
      items: cart,
      totalAmount,
      orderDate: serverTimestamp(),
      status: "Confirmed",
    };

    await addDoc(collection(db, "orders"), orderData);
    return true;
  } catch (error) {
    console.error("Error saving order:", error);
    throw error;
  }
};

export const getUserOrders = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn("User not authenticated");
      return [];
    }

    const q = query(collection(db, "orders"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
