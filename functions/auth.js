// auth.js
const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

// Registers a new user and initializes their profile in the database
exports.handleNewUserRegistration = async (user, data) => {
  const { firstName, lastName, email, birthday } = data;
  const defaultHabit = 'drinkWater'; // Default habit if not specified
  try {
    await db.collection('Users').doc(user.uid).set({
      email: email,  // Ensure the email is included
      firstName: firstName || '',
      lastName: lastName || '',
      birthday: birthday || '', // Store birthday in the user profile
      profilePicUrl: user.photoURL || '',
      selectedHabit: defaultHabit
    });
    console.log("User registration successful for:", email);
    return { status: 'success', message: "User registration successful" };
  } catch (error) {
    console.error("Error in user registration:", error);
    throw new Error("Failed to register new user.");
  }
};
