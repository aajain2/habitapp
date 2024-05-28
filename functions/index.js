// This file serves as the main entry point for defining cloud functions using Firebase Functions v2 API.
// It orchestrates and delegates responsibilities to domain-specific handlers for authentication, posts, cleanups,
// habits, and social interactions.

// Using Firebase Functions v2 API
const { onCall, onCreate, schedule } = require("firebase-functions/v2/https");
const { onRun } = require("firebase-functions/v2/pubsub");
const admin = require("firebase-admin");
admin.initializeApp();

// Import custom function handlers from domain-specific files
const authHandlers = require("./auth");
const postHandlers = require("./posts");
const cleanupHandlers = require("./dailyCleanup");
const habitHandlers = require("./habits");
const socialHandlers = require("./social");

exports.registerUser = onCall((data, context) => {
  // Ensure that the function caller is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  // Data includes email, firstName, lastName, username, birthday, etc.
  // User creation is handled on the client-side using Firebase Authentication for security reasons
  // This function is only for storing additional user details after authentication
  return authHandlers.handleNewUserRegistration({
    uid: context.auth.uid, // Use the UID from the authenticated user context
    email: context.auth.token.email || '', // Safely use email from authentication token if available
  }, data)
  .then(() => {
    return { status: 'success', message: "User registered successfully" };
  })
  .catch(error => {
    console.error("Registration error:", error);
    throw new functions.https.HttpsError('unknown', 'Failed to register user', error);
  });
});

// Post creation and management functions
exports.createPost = onCall((data, context) => {
  return postHandlers.createPost(data, context);
});

// Function to flag a post for review or moderation
exports.flagPost = onCall((data, context) => {
  return postHandlers.flagPost(data, context);
});

// Scheduled functions for daily maintenance and cleanup of posts and user habits
exports.dailyCleanup = schedule('every 24 hours').onRun((context) => {
  return cleanupHandlers.scheduledDailyCleanup(context);
});
exports.generateDailyPrompts = schedule('every 24 hours').onRun((context) => {
  return cleanupHandlers.generateDailyPrompts(context);
});

// Habit management functions to complete, track, or change habits
exports.completeHabit = onCall((data, context) => {
  return habitHandlers.completeHabit(data, context);
});
exports.getHabitProgress = onCall((data, context) => {
  return habitHandlers.getHabitProgress(data, context);
});
exports.changeUserHabit = onCall((data, context) => {
  return habitHandlers.changeUserHabit(data, context);
});

// Social interactions and friend management functions to add, remove, accept, or reject friends
exports.addFriend = onCall((data, context) => {
  return socialHandlers.addFriend(data, context);
});
exports.removeFriend = onCall((data, context) => {
  return socialHandlers.removeFriend(data, context);
});
exports.acceptFriendRequest = onCall((data, context) => {
  return socialHandlers.acceptFriendRequest(data, context);
});
exports.rejectFriendRequest = onCall((data, context) => {
  return socialHandlers.rejectFriendRequest(data, context);
});
