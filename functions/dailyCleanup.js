// This file contains scheduled functions for daily maintenance tasks using Firebase functions.
// It includes cleanup of old posts and resetting user streaks based on activity logs.
const { getFirestore } = require('firebase-admin/firestore');
const { schedule } = require('firebase-functions/v2/pubsub');

const db = getFirestore();

// Performs daily cleanup tasks such as deleting old posts and checking user streaks
exports.scheduledDailyCleanup = async (context) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  try {
    const postsSnapshot = await db.collection('Posts').where('createdAt', '<', yesterday).get();
    postsSnapshot.forEach((doc) => {
      doc.ref.delete();
    });
    console.log("Daily cleanup executed successfully.");
  } catch (error) {
    console.error("Error during daily cleanup:", error);
  }

  try {
    const usersSnapshot = await db.collection('Users').get();
    usersSnapshot.forEach(async (userDoc) => {
      const userId = userDoc.id;
      const habitDoc = await db.collection('Users').doc(userId).collection('Habits').doc(yesterdayStr).get();
      if (!habitDoc.exists || !habitDoc.data().completed) {
        await db.collection('Users').doc(userId).update({ streak: 0 });
      }
    });
    console.log("Streaks checked and updated successfully.");
  } catch (error) {
    console.error("Error checking and updating streaks:", error);
  }
};

// Generates daily prompts for users based on their selected habits
exports.generateDailyPrompts = schedule('every 24 hours').onRun(async (context) => {
  const usersRef = db.collection('Users');
  try {
    const usersSnapshot = await usersRef.get();
    usersSnapshot.forEach(async (doc) => {
      const userHabit = doc.data().selectedHabit;
      const prompts = await db.collection('Habits').doc(userHabit).collection('Prompts').get();
      const allPrompts = prompts.docs.map(doc => doc.data());
      const randomPrompt = allPrompts[Math.floor(Math.random() * allPrompts.length)];
      await db.collection('Users').doc(doc.id).collection('DailyPrompts').add(randomPrompt);
      console.log("Daily prompts generated for user:", doc.id);
    });
  } catch (error) {
    console.error("Error generating daily prompts:", error);
  }
});
