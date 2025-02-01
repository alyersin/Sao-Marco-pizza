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

export const getAddress = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User is not authenticated");
      return null;
    }

    const q = query(
      collection(db, "addresses"),
      where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const addressData = querySnapshot.docs[0].data();
      return addressData.address;
    }

    return null;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};

export const saveAddress = async (address) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");

    const addressData = {
      userId: user.uid,
      address,
    };

    await addDoc(collection(db, "addresses"), addressData);
    return true;
  } catch (error) {
    console.error("Error saving address:", error);
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
