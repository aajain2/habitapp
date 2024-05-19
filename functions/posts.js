const { getFirestore } = require('firebase-admin/firestore');

/**
 * Handles all post-related functionalities, ensuring that posts are created properly
 * and managing any interactions with post data, including flagging for moderation.
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

exports.flagPost = async (data, context) => {
  if (!context.auth) {
    throw new Error('Authentication required.');
  }
  const { postId } = data;
  try {
    const postRef = db.collection('Posts').doc(postId);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
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
