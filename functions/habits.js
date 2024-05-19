const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

exports.completeHabit = async (data, context) => {
  if (!context.auth) {
    throw new Error('Authentication required.');
  }
  const { habitId, promptId, completionTime } = data;
  const userId = context.auth.uid;
  const habitDocRef = db.collection('Users').doc(userId).collection('Habits').doc(habitId);
  const habitDoc = await habitDocRef.get();
  const completedToday = habitDoc.exists && habitDoc.data().completionTime && new Date(habitDoc.data().completionTime).toDateString() === new Date(completionTime).toDateString();

  if (completedToday) {
    return { message: "Habit already completed today." };
  } else {
    await habitDocRef.set({ completionTime });
    return { message: "Habit completed successfully." };
  }
};
