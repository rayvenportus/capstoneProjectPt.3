
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBePUjxT066qTgkgoaIJ0iBJLZSXEHyK08",
  authDomain: "bloodfinder-83880.firebaseapp.com",
  projectId: "bloodfinder-83880",
  storageBucket: "bloodfinder-83880.firebasestorage.app",
  messagingSenderId: "371871730353",
  appId: "1:371871730353:web:78889d8b178aba0b98b090",
  measurementId: "G-JZRDDV63Q9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);