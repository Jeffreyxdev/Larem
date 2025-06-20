
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your Firebase configuration (from your Firebase project settings)
const firebaseConfig = {
   apiKey: "AIzaSyB6I5UxuGCKvAG8H6q14pNALlyDygDnqXM",
  authDomain: "lemren.firebaseapp.com",
  projectId: "lemren",
  storageBucket: "lemren.firebasestorage.app",
  messagingSenderId: "1018234826343",
  appId: "1:1018234826343:web:a02411530152630e5a2ec2",
  measurementId: "G-VX9E0E1K1D"
};
const app = initializeApp(firebaseConfig);
// Initialize Firestore
export const db = getFirestore(app);