// Import dependencies
const admin = require('firebase-admin');
const serviceAccount = require('../functions/serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Make the admin object globally available if needed in your tests
global.firebaseAdmin = admin;
global.db = admin.firestore();
