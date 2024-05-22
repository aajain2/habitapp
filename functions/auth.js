// This file handles user authentication and registration. It includes functions to manage
// the creation of user profiles in the Firestore database upon new user registration.
const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

// Registers a new user and initializes their profile in the database
exports.handleNewUserRegistration = async (user, data) => {
  const { firstName, lastName, username } = data;
  const defaultHabit = 'drinkWater'; // Default habit for new users
  try {
    await db.collection('Users').doc(user.uid).set({
      email: user.email,
      firstName: firstName || '',
      lastName: lastName || '',
      username: username || 'New User',
      profilePicUrl: user.photoURL || '',
      selectedHabit: defaultHabit
    });
    console.log("User registration successful for:", user.email);
    return { email: user.email };
  } catch (error) {
    console.error("Error in user registration:", error);
    throw new Error("Failed to register new user.");
  }
};
