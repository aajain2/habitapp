// /functions/dailyCleanup.js
// Scheduled Firebase Function for daily maintenance tasks.
// Currently, it includes a function to delete all posts from Firestore
// every 24 hours, helping to manage data cleanliness and storage.
const { schedule } = require('firebase-functions/v2/pubsub');
const { deletePosts } = require('./lib/firestoreHelper');

exports.deletePosts = schedule('every 24 hours').onRun((context) => {
  return deletePosts();
});
