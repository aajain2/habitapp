const { getFirestore } = require('firebase-admin/firestore');

/**
 * Manages authentication-related tasks such as registering new users and initializing their profile.
 * Sets up default user properties and a default habit.
 */
const db = getFirestore();

exports.handleNewUserRegistration = async (user) => {
  const defaultHabit = 'drinkWater'; // Default habit if not specified
  try {
    await db.collection('Users').doc(user.uid).set({
      email: user.email,
      username: user.displayName || 'New User',
      profilePicUrl: user.photoURL || '',
      selectedHabit: defaultHabit
    });
    console.log("User registration successful for:", user.email);
  } catch (error) {
    console.error("Error in user registration:", error);
    throw new Error("Failed to register new user.");
  }
};
