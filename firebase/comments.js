import { doc, updateDoc, arrayUnion, getDoc, getDocs, where, documentId, collection } from "firebase/firestore"
import { firestore } from "../firebaseConfig"

// Adds a comment and then returns the updated comments
export const addComment = async (uid, comment, postID) => {
  try {
    if (comment === "") {
      throw new Error("Please include text in comment")
    }

    await updateDoc(doc(firestore, "posts", postID), {
      comments: arrayUnion({
        uid: uid,
        comment: comment,
        timestamp: new Date()
      })
    })

    const postSnap = await getDoc(doc(firestore, "posts", postID))
  
    if (!postSnap.exists()) {
      throw new Error("Post not found, please restart app")
    }

    return getCommentData(postSnap.data().comments)
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getCommentData = async (comments) => {
  const returnComments = []

  try {
    for (const comment of comments) {
      const commentSnap = await getDoc(doc(firestore, "users", comment.uid))
    
      if (!commentSnap.exists()) {
        throw new Error("Comment not found, please restart app")
      }

      returnComments.push({
        ...comment,
        avatar: commentSnap.data().avatar,
        username: commentSnap.data().username
      })
    }

    return returnComments
  } catch (e) {
    throw new Error(e.message)
  }
}
