import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFn0aDlFW3qDgatyJxQ_IEuXu9WzGDlM8",
  authDomain: "collabora-backend.firebaseapp.com",
  databaseURL:
    "https://collabora-backend-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "collabora-backend",
  storageBucket: "collabora-backend.firebasestorage.app",
  messagingSenderId: "124577055370",
  appId: "1:124577055370:web:94214ab77e24c19de8a373",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, signInWithEmailAndPassword, db };
