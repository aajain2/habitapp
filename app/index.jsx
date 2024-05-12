import { StatusBar } from 'expo-status-bar';
import React from 'react';

// Updated Firebase imports for modular API
import { initializeApp, getApps, getApp } from 'firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/Landing.js';

import Register from './components/auth/Register'; // Make sure this path is correct

// Firebase configuration
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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
