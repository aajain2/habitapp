// /functions/posts.js
/**
 * This module manages interactions with post-related data for the Trabit app.
 * It includes functions to handle post creation, updates, and potentially deletion,
 * allowing users to interact with their and others' posts.
 *
 * Functions:
 * - createPost: Allows authenticated users to create a new post. It handles data validation
 *   and updates Firestore accordingly.
 */
const { onCall } = require('firebase-functions/v2/https');
const firestoreHelper = require('./lib/firestoreHelper');

exports.createPost = onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }
  return firestoreHelper.createPost(context.auth.uid, data.promptId, data.photoUrl);
});
