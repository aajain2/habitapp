// This file handles operations related to habit tracking within the application. It supports
// functionality for users to mark habits as completed and manages habit-related data.

const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

// Completes a habit for the user on the specified date
exports.completeHabit = async (data, context) => {
  if (!context.auth) {
    throw new Error('Authentication required.'); // Ensures the user is authenticated
  }
  const { habitId, promptId, completionTime } = data;
  const userId = context.auth.uid;
  const habitDocRef = db.collection('Users').doc(userId).collection('Habits').doc(habitId);
  const habitDoc = await habitDocRef.get();
  const completedToday = habitDoc.exists && habitDoc.data().completionTime && 
                         new Date(habitDoc.data().completionTime).toDateString() === new Date(completionTime).toDateString();

  if (completedToday) {
    return { message: "Habit already completed today." }; // Prevents duplicate entries for the same day
  } else {
    await habitDocRef.set({ completionTime }); // Marks the habit as completed for the day
    return { message: "Habit completed successfully." };
  }
};
