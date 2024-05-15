// /functions/dailyCleanup.js
/**
 * Handles scheduled maintenance tasks for the Trabit app,
 * particularly focusing on daily cleanup routines.
 * This file defines functions that are executed on a schedule to clean up or archive data,
 * ensuring the app's data remains fresh and relevant.
 *
 * Functions:
 * - scheduledDailyCleanup: Runs daily to perform necessary data cleanup tasks,
 *   such as deleting old posts or archiving data as required by the app's logic.
 */
const { schedule } = require('firebase-functions/v2/pubsub');
const firestoreHelper = require('./lib/firestoreHelper');

exports.scheduledDailyCleanup = schedule('every 24 hours').onRun(async (context) => {
  console.log("Running daily cleanup of posts...");
  return firestoreHelper.deletePosts();
});
