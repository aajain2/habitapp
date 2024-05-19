const { getFirestore } = require('firebase-admin/firestore');
const { schedule } = require('firebase-functions/v2/pubsub');

/**
 * Manages scheduled maintenance tasks such as cleaning up old posts and checking habit streaks.
 * Ensures that the application's data remains fresh and relevant.
 */
const db = getFirestore();

exports.scheduledDailyCleanup = async (context) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0]; // Format YYYY-MM-DD

  try {
    const postsSnapshot = await db.collection('Posts').where('createdAt', '<', yesterday).get();
    postsSnapshot.forEach((doc) => {
      doc.ref.delete();
    });
    console.log("Daily cleanup executed successfully.");
  } catch (error) {
    console.error("Error during daily cleanup:", error);
  }

  // Reset streak if not completed
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
