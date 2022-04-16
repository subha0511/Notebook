// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwHAE4UTFkpLUgBAt0Gjio_1wzINWpOPk",
  authDomain: "notes-vite.firebaseapp.com",
  projectId: "notes-vite",
  storageBucket: "notes-vite.appspot.com",
  messagingSenderId: "352450508887",
  appId: "1:352450508887:web:87465e7491fd0803f74b12",
  measurementId: "G-F6GF2N8J0W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
