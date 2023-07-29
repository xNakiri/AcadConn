// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS8ccqgXfMqjRXLJbdKWuHW5x6_0l9z5Y",
  authDomain: "acadconnec-fca3d.firebaseapp.com",
  projectId: "acadconnec-fca3d",
  storageBucket: "acadconnec-fca3d.appspot.com",
  messagingSenderId: "113634618313",
  appId: "1:113634618313:web:e163924106b2abdd039618",
  measurementId: "G-387C8XMZXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

