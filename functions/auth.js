// /functions/auth.js
/**
 * This module contains Firebase Cloud Functions related to authentication for the Trabit app.
 * It handles the creation of user documents upon new user registration,
 * ensuring that each user has a corresponding profile in Firestore.
 *
 * Functions:
 * - handleNewUserRegistration: Triggered automatically when a new user signs up.
 *   This function creates a new document in the 'Users' collection with initial setup data.
 */
const { onCreate } = require('firebase-functions/v2/auth');
const { createUserDocument } = require('./lib/authHelper');

exports.handleNewUserRegistration = onCreate((user) => {
  return createUserDocument(user);
});
