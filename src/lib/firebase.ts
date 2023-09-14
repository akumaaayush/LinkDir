// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { derived, type Readable } from "svelte/store";
import { docStore, userStore } from "sveltefire";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBc7XkQqvPT7JWR7rRDH4U2HJOPKhNIEUM",
  authDomain: "linklist-b3333.firebaseapp.com",
  projectId: "linklist-b3333",
  storageBucket: "linklist-b3333.appspot.com",
  messagingSenderId: "242069264030",
  appId: "1:242069264030:web:eec31676e892bd1ca40d8f",
  measurementId: "G-WKYRP9WS5P",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

const user = userStore(auth);

interface UserData {
  username: string;
  bio: string;
  photoURL: string[];
  links: any[];
}

export const userData: Readable<UserData | null> = derived(
  user,
  ($user, set) => {
    if ($user) {
      return docStore<UserData>(db, `users/${$user!.uid}`).subscribe(set);
    } else {
      set(null);
    }
  }
);
