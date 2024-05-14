// /functions/auth.js
// Firebase Function for handling authentication-related tasks.
// This file includes a function that triggers on user creation to manage
// user documents in Firestore.
const { onCreate } = require('firebase-functions/v2/auth');
const { createUserDocument } = require('./lib/authHelper');

exports.registerUser = onCreate((user) => {
  return createUserDocument(user);
});
