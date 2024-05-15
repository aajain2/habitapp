// Using Firebase Functions v2 API
const {onRequest, onCall} = require("firebase-functions/v2/https");
const {onCreate} = require("firebase-functions/v2/auth");
const logger = require("firebase-functions/logger");

// Import custom function handlers from other files
const authHandlers = require("./auth");
const postHandlers = require("./posts");
const cleanupHandlers = require("./dailyCleanup");
const habitHandlers = require("./habits");

// Auth-related function using onCreate trigger for new user registration
exports.registerUser = onCreate((user) => {
  return authHandlers.handleNewUserRegistration(user);
});

// HTTP function for creating a post, using onCall for callable functions
exports.createPost = onCall((data, context) => {
  return postHandlers.createPost(data, context);
});

// Scheduled function for daily cleanup
exports.dailyCleanup = cleanupHandlers.scheduledDailyCleanup;

// Functions for managing habit tracking
// Function to add or update habit progress
exports.addOrUpdateHabitProgress = onCall((data, context) => {
  return habitHandlers.addOrUpdateHabitProgress(data, context);
});

// Function to retrieve habit progress for a specific period
exports.getHabitProgress = onCall((data, context) => {
  return habitHandlers.getHabitProgress(data, context);
});
