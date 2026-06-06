import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAB3mBFWqnNqKWzj-V3XA9QQn2nkguKyyM",
  authDomain: "cyber-guardians-95f54.firebaseapp.com",
  projectId: "cyber-guardians-95f54",
  storageBucket: "cyber-guardians-95f54.firebasestorage.app",
  messagingSenderId: "100034002766",
  appId: "1:100034002766:web:15caae990e04384cba681f",
  measurementId: "G-VLX1HLLXNB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);