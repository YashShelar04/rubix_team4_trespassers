// lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA5lwfOBWzo8x5qnVA8JVI5e058FRYr2sQ",
    authDomain: "rubix-trespassers.firebaseapp.com",
    projectId: "rubix-trespassers",
    storageBucket: "rubix-trespassers.firebasestorage.app",
    messagingSenderId: "501712064757",
    appId: "1:501712064757:web:e1513415a2bfb80a3875bc",
    measurementId: "G-3ZF22QKNVX"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
