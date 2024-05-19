// This file configures the Firebase Admin SDK for use in test environments. It initializes
// Firebase with admin privileges using a service account, allowing full access to Firebase services
// like Firestore during tests. This setup helps simulate and test interactions with Firebase as they
// would occur in a production environment.

// Import dependencies
const admin = require('firebase-admin'); // Firebase Admin SDK for node.js
const serviceAccount = require('../functions/serviceAccountKey.json'); // Service account credentials

// Initialize Firebase Admin with credentials from the service account for full administrative access
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Make the admin object globally available if needed in your tests
// This allows tests to use Firebase Admin without needing to reinitialize it
global.firebaseAdmin = admin;
// Access Firestore database operations globally in tests
global.db = admin.firestore();
