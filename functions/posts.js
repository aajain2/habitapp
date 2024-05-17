const { getFirestore } = require('firebase-admin/firestore');

/**
 * Handles all post-related functionalities, ensuring that posts are created properly
 * and managing any interactions with post data.
 */
const db = getFirestore();

exports.createPost = async (data, context) => {
  if (!context.auth) {
    throw new Error('Authentication required.');
  }
  try {
    const postData = {
      userId: context.auth.uid,
      promptId: data.promptId,
      photoUrl: data.photoUrl,
      createdAt: new Date()
    };
    const postRef = await db.collection('Posts').add(postData);
    console.log("Post created with ID:", postRef.id);
    return postRef;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error('Failed to create post');
  }
};
