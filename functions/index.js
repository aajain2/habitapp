// This file serves as the main entry point for defining cloud functions using Firebase Functions v2 API.
// It orchestrates and delegates responsibilities to domain-specific handlers for authentication, posts, cleanups,
// habits, and social interactions.

// Using Firebase Functions v2 API
const { onCall, onCreate, schedule } = require("firebase-functions/v2/https");
const { onRun } = require("firebase-functions/v2/pubsub");

// Import custom function handlers from domain-specific files
const authHandlers = require("./auth");
const postHandlers = require("./posts");
const cleanupHandlers = require("./dailyCleanup");
const habitHandlers = require("./habits");
const socialHandlers = require("./social");

// User registration function triggered on creation of a new user
exports.registerUser = onCreate((user) => {
  const data = {
    firstName: user.displayName ? user.displayName.split(' ')[0] : '',
    lastName: user.displayName ? user.displayName.split(' ')[1] : '',
    username: user.email.split('@')[0]  // Generates a username from the user's email
  };
  return authHandlers.handleNewUserRegistration(user, data);
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
