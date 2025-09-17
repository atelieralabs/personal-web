// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDu3pMYk0_6mpbBGL0T6zK8tIJ1YoJwYXA",
  authDomain: "portodatabase1.firebaseapp.com",
  projectId: "portodatabase1",
  storageBucket: "portodatabase1.firebasestorage.app",
  messagingSenderId: "1080921608039",
  appId: "1:1080921608039:web:6cd9782680c7feb60f69c2",
  measurementId: "G-9MM7Z9NS3Q",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Analytics (opsional, hanya jalan kalau di browser)
const analytics = getAnalytics(app);

// Inisialisasi Firestore
const db = getFirestore(app);

export { db, analytics };
