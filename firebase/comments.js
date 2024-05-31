import { getDocs, collection, query, where, documentId, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"
import { firestore } from "../firebaseConfig"

// Adds a comment and then returns the updated comments
export const addComment = async (uid, username, avatar, comment, postID) => {
  try {
    await updateDoc(doc(firestore, "posts", postID), {
      comments: arrayUnion({
        uid: uid,
        username: username,
        avatar: avatar,
        comment: comment,
        createdAt: new Date()
      })
    })

    const postSnap = await getDoc(doc(firestore, "posts", postID))
  
    if (!postSnap.exists()) {
      throw new Error("Post not found")
    }

    return postSnap.data().comments
  } catch (e) {
    throw new Error(e.message)
  }
}
