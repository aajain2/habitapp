// /functions/lib/firestoreHelper.js
// This file includes helper functions for interacting with Firestore.
// Functions included are for creating posts and deleting posts,
// which are used in the corresponding Firebase Functions.

const { getFirestore, Timestamp } = require('firebase-admin/firestore');

const db = getFirestore();

const createPost = async (userId, promptId, photoUrl) => {
  const postRef = db.collection('posts').doc();
  await postRef.set({
    userId,
    promptId,
    photoUrl,
    createdAt: Timestamp.now()
  });
  return postRef.id;
};

const deletePosts = async () => {
  const snapshot = await db.collection('posts').get();
  snapshot.docs.forEach(doc => {
    doc.ref.delete();
  });
};

module.exports = { createPost, deletePosts };
