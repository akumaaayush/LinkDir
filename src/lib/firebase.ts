// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBc7XkQqvPT7JWR7rRDH4U2HJOPKhNIEUM",
  authDomain: "linklist-b3333.firebaseapp.com",
  projectId: "linklist-b3333",
  storageBucket: "linklist-b3333.appspot.com",
  messagingSenderId: "242069264030",
  appId: "1:242069264030:web:eec31676e892bd1ca40d8f",
  measurementId: "G-WKYRP9WS5P",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
