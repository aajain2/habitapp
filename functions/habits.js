// /functions/habits.js
/**
 * This module handles habit tracking functionalities for the Trabit app.
 * It provides Firebase Cloud Functions to manage and retrieve user habit progress,
 * which are essential for the calendar feature in the app that tracks and displays user habits over time.
 * 
 * Functions:
 * 1. addOrUpdateHabitProgress - Allows authenticated users to add or update their progress on a specific habit.
 *    It receives habit data including the date, completion status, prompt ID, and an optional photo URL.
 *    This function updates the user's habit data for a given date, ensuring that the habit tracking is accurate and up-to-date.
 * 
 * 2. getHabitProgress - Retrieves a user's habit progress over a specified date range.
 *    This function is crucial for generating views in the app where users can see their historical habit data,
 *    helping them to track their consistency and improvements over time.
 *    It ensures that only authenticated users can access their own habit data, preserving user privacy and data security.
 * 
 * Both functions enforce user authentication to maintain data security and integrity,
 * ensuring that users can only interact with their own habit data.
 */

const { onCall } = require('firebase-functions/v2/https');
const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

exports.addOrUpdateHabitProgress = onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }

  const { date, completed, promptId, photoUrl } = data;
  const userHabitsRef = db.collection('Users').doc(context.auth.uid).collection('Habits').doc(date);

  try {
    await userHabitsRef.set({
      completed,
      promptId,
      photoUrl
    }, { merge: true });
    return { message: 'Habit progress updated successfully.' };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Failed to update habit progress', error);
  }
});

exports.getHabitProgress = onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }

  const { startDate, endDate } = data;
  const userHabitsRef = db.collection('Users').doc(context.auth.uid).collection('Habits');
  const snapshot = await userHabitsRef.where('date', '>=', startDate).where('date', '<=', endDate).get();

  const habits = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
  return { habits };
});
