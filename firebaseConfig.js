// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQoKtYGhwUP7Fne8Mi3TgYebKFXLVVUso",
  authDomain: "trabitapp.firebaseapp.com",
  projectId: "trabitapp",
  storageBucket: "trabitapp.appspot.com",
  messagingSenderId: "355540549767",
  appId: "1:355540549767:web:c39ac1db1d9d87a4303822",
  measurementId: "G-RPT6V0G1BV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const firestore = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

// Connect to emulators if in development mode
if (__DEV__) {
  console.log('Running in development mode. Using emulators.');
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFunctionsEmulator(functions, 'localhost', 5001);
} else {
  console.log('Running in production mode.');
}

export { app, firestore, auth, functions };
