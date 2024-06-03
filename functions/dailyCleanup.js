import { onSchedule } from 'firebase-functions/v2/scheduler';
import admin from 'firebase-admin';
import { logger } from 'firebase-functions';

admin.initializeApp();

const db = admin.firestore();

// Scheduled function to reset daily user flags and manage non-completions
// 7:00 AM UTC is 12:00 AM PDT
export const resetDailyFlagsAndHandleNonCompletions = onSchedule("0 7 * * *", async () => {
  const usersRef = db.collection('users');
  const nonCompletersRef = db.collection('nonCompleters');
  const dateStr = new Date().toISOString().split('T')[0];  // e.g., '2024-01-01'

  // Delete existing nonCompleters documents
  try {
      const snapshot = await nonCompletersRef.get();
      const batch = db.batch();
      snapshot.docs.forEach(doc => {
          batch.delete(doc.ref);
      });
      await batch.commit();
      logger.log("Previous nonCompleters cleared successfully.");
  } catch (error) {
      logger.error("Error clearing nonCompleters collection:", error);
  }

  // Handle non-completions for the current day
  try {
      const batch = db.batch();
      const usersSnapshot = await usersRef.get();
      usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          if (!userData.completedToday) {
              batch.update(doc.ref, { streak: 0 });
              batch.set(nonCompletersRef.doc(doc.id), { date: dateStr, userId: doc.id });
          }
          batch.update(doc.ref, { completedToday: false });
      });
      await batch.commit();
      logger.log("Reset completedToday and handled non-completions successfully.");
  } catch (error) {
      logger.error("Error resetting daily flags and handling non-completions:", error);
  }
});

// Scheduled function for deleting all posts and generating daily prompts
export const scheduledDailyCleanupAndPrompts = onSchedule("0 7 * * *", async () => {
    try {
      const postsSnapshot = await db.collection('posts').get();
      const deletePromises = postsSnapshot.docs.map((doc) => doc.ref.delete());
      await Promise.all(deletePromises);
      logger.log("All posts deleted successfully.");

      // Generate daily prompts for each user
      const usersRef = db.collection('users');
      const usersSnapshot = await usersRef.get();
      const promptPromises = usersSnapshot.docs.map(async (doc) => {
        const userHabit = doc.data().habit;
        const habitDoc = await db.collection('habits').doc(userHabit).get();
        const prompts = habitDoc.data().prompts;
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        await db.collection('users').doc(doc.id).update({ todaysPrompt: randomPrompt });
        logger.log("Daily prompts generated and updated for user:", doc.id);
      });
      await Promise.all(promptPromises);
    } catch (error) {
      logger.error("Error generating daily prompts:", error);
    }
});