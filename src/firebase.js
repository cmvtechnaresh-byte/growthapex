// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZzCAPldGxA7o-cplINToUUtA6RdcajLI",
  authDomain: "growthapex-e752f.firebaseapp.com",
  projectId: "growthapex-e752f",
  storageBucket: "growthapex-e752f.firebasestorage.app",
  messagingSenderId: "85062567116",
  appId: "1:85062567116:web:fd08613d4fad9c45ae2e69",
  measurementId: "G-6K8MZ1XBYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
