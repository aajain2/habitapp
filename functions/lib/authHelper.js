// /functions/lib/authHelper.js
// This file manages authentication-related 
// helper functions for Firebase Authentication.
// It provides a helper function to create a user document in Firestore
// when a new user is created using Firebase Authentication.

const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

const createUserDocument = async (user) => {
  const userRef = db.collection('users').doc(user.uid);
  await userRef.set({
    email: user.email,
    profilePicUrl: null,  // Default to null or a placeholder image
    selectedHabitId: null // Default to null or specific habit
  }, { merge: true });
};

module.exports = { createUserDocument };
