const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

exports.handleNewUserRegistration = async (user, data) => {
  const { firstName, lastName, username } = data;
  const defaultHabit = 'drinkWater'; // Default habit if not specified
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
    return { email: user.email }; // Return user email or other relevant data
  } catch (error) {
    console.error("Error in user registration:", error);
    throw new Error("Failed to register new user.");
  }
};
