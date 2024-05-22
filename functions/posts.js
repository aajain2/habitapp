// This file manages post-related functionalities within the application, including creating posts
// and managing post visibility through flagging mechanisms.

const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

// Creates a new post with the given data from the user
exports.createPost = async (data, context) => {
  if (!context.auth) {
    throw new Error('Authentication required.'); // Ensures the user is authenticated
  }
  try {
    const postData = {
      userId: context.auth.uid,
      promptId: data.promptId,
      photoUrl: data.photoUrl,
      createdAt: new Date(),
      flags: 0
    };
    const postRef = await db.collection('Posts').add(postData);
    console.log("Post created with ID:", postRef.id);
    return postRef;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error('Failed to create post');
  }
};

// Flags a post for inappropriate content, deletes if flags exceed a limit
exports.flagPost = async (data, context) => {
  if (!context.auth) {
    throw new Error('Authentication required.'); // Ensures the user is authenticated
  }
  const { postId } = data;
  try {
    const postRef = db.collection('Posts').doc(postId);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      console.log("Post not found:", postId);
      throw new Error('Post not found');
    }

    const currentFlags = postDoc.data().flags || 0;
    if (currentFlags >= 2) {
      await postRef.delete();
      console.log("Post deleted due to flags:", postId);
      return { message: "Post deleted due to flags" };
    } else {
      await postRef.update({ flags: currentFlags + 1 });
      console.log("Post flagged:", postId);
      return { message: "Post flagged successfully" };
    }
  } catch (error) {
    console.error("Error flagging post:", error);
    throw new Error('Failed to flag post');
  }
};
