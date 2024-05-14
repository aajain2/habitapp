// /functions/posts.js
// Contains Firebase Functions related to handling posts within the application.
// Includes functions for creating posts using data provided by users.
const { onCall } = require('firebase-functions/v2/https');
const { createPost } = require('./lib/firestoreHelper');

exports.createPost = onCall((data, context) => {
  return createPost(context.auth.uid, data.promptId, data.photoUrl);
});
