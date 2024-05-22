// This file configures the Firebase client SDKs for use in a web application. It initializes Firebase services
// like Firestore, Auth, and Functions, and connects to local emulators during development for testing purposes.

// Import the necessary Firebase SDK functions to initialize the services used in the application
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Configuration object containing the Firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyBQoKtYGhwUP7Fne8Mi3TgYebKFXLVVUso",
  authDomain: "trabitapp.firebaseapp.com",
  projectId: "trabitapp",
  storageBucket: "trabitapp.appspot.com",
  messagingSenderId: "355540549767",
  appId: "1:355540549767:web:c39ac1db1d9d87a4303822",
  measurementId: "G-RPT6V0G1BV"
};

// Initialize Firebase with the above configuration
const app = initializeApp(firebaseConfig);

// Initialize individual Firebase services to be used within the application
const firestore = getFirestore(app); // Firestore for database operations
const auth = getAuth(app);           // Authentication service
const functions = getFunctions(app); // Cloud Functions

// Conditionally connect to Firebase emulators based on whether the app is running in development mode
if (__DEV__) {
  console.log('Running in development mode. Using emulators.');
  // Connect to Firestore emulator running on localhost
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  // Connect to Authentication emulator running on localhost
  connectAuthEmulator(auth, 'http://localhost:9099');
  // Connect to Functions emulator running on localhost
  connectFunctionsEmulator(functions, 'localhost', 5001);
} else {
  console.log('Running in production mode.'); // Indicate that the app is running in production
}

// Export initialized services for use throughout the application
export { app, firestore, auth, functions };
