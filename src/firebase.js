// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRuZp6HJeW3N9wwodBNuhO8unJA809mNc",
  authDomain: "zing-mp3-auth.firebaseapp.com",
  projectId: "zing-mp3-auth",
  storageBucket: "zing-mp3-auth.appspot.com",
  messagingSenderId: "476712996525",
  appId: "1:476712996525:web:be81bfc71a753049b8c024"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);