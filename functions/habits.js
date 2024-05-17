const { getFirestore } = require('firebase-admin/firestore');

/**
 * Manages user habits, including tracking daily completions, handling streaks,
 * and retrieving progress over time.
 */
const db = getFirestore();

exports.completeHabit = async (data, context) => {
  if (!context.auth) throw new Error('Authentication required.');
  const { habitId, promptId, completionTime = new Date() } = data;
  const userId = context.auth.uid;
  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

  const habitDoc = db.collection('Users').doc(userId).collection('Habits').doc(today);
  const snapshot = await habitDoc.get();

  if (snapshot.exists && snapshot.data().completed) {
    return { message: "Habit already completed today." };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayDoc = await db.collection('Users').doc(userId).collection('Habits').doc(yesterday.toISOString().split('T')[0]).get();
  let streak = yesterdayDoc.exists && yesterdayDoc.data().completed ? yesterdayDoc.data().streak + 1 : 1;

  await habitDoc.set({
    completed: true,
    completionTime: completionTime,
    promptId: promptId,
    streak: streak
  });

  return { message: "Habit completed successfully.", streak: streak };
};

exports.getHabitProgress = async (data, context) => {
  if (!context.auth) throw new Error('Authentication required.');
  const { startDate, endDate } = data;
  const userId = context.auth.uid;

  const habits = await db.collection('Users').doc(userId).collection('Habits')
    .where('date', '>=', startDate)
    .where('date', '<=', endDate)
    .get();

  return habits.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

exports.changeUserHabit = async (data, context) => {
  if (!context.auth) throw new Error('Authentication required.');
  const { newHabit } = data;
  const userId = context.auth.uid;

  await db.collection('Users').doc(userId).update({
    selectedHabit: newHabit
  });

  return { message: "Habit updated successfully." };
};
