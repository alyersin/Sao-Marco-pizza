import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnQU_f3WDKEaw-zQbjXHF7RtcCSEQTkdI",
  authDomain: "sao-marco-pizza.firebaseapp.com",
  projectId: "sao-marco-pizza",
  storageBucket: "sao-marco-pizza.firebasestorage.app",
  messagingSenderId: "994775910230",
  appId: "1:994775910230:web:68cc399c3b5dda84ba78f7",
  measurementId: "G-QH6R2RB1TS",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
