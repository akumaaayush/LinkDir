// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
