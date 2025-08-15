// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxVYO9YyMyJ4zi7a5e-cp0AytP3RQ6Ezs",
  authDomain: "ritvl-5b106.firebaseapp.com",
  projectId: "ritvl-5b106",
  storageBucket: "ritvl-5b106.firebasestorage.app",
  messagingSenderId: "490017678502",
  appId: "1:490017678502:web:c9567cdbde824a2bda4067",
  measurementId: "G-SGBLE644WK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);