// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA5AQCAOy5GHEvuaXR1erah7JQPoayMIIo",
  authDomain: "atelierawebporto.firebaseapp.com",
  projectId: "atelierawebporto",
  storageBucket: "atelierawebporto.firebasestorage.app",
  messagingSenderId: "56627261876",
  appId: "1:56627261876:web:7aea6d18bfeb20a430c2e1",
  measurementId: "G-VNX8Y651H9"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Analytics (opsional, hanya jalan kalau di browser)
const analytics = getAnalytics(app);

// Inisialisasi Firestore
const db = getFirestore(app);

const auth = getAuth(app);

export { db, analytics, auth };


