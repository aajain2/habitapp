// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHlKpsQC6u76ZEmP-fVvfn1M5x3aK49qA",
  authDomain: "habitapp-1a624.firebaseapp.com",
  projectId: "habitapp-1a624",
  storageBucket: "habitapp-1a624.appspot.com",
  messagingSenderId: "1091787134124",
  appId: "1:1091787134124:web:7e342d3557a74d5ab63b09",
  measurementId: "G-VZCYBMCRZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);