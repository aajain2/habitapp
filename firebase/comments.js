import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"
import { firestore } from "../firebaseConfig"

// Adds a comment and then returns the updated comments
export const addComment = async (uid, username, avatar, comment, postID) => {
  try {
    if (comment === "") {
      throw new Error("Please include text in comment")
    }

    await updateDoc(doc(firestore, "posts", postID), {
      comments: arrayUnion({
        uid: uid,
        username: username,
        avatar: avatar,
        comment: comment,
        timestamp: new Date()
      })
    })

    const postSnap = await getDoc(doc(firestore, "posts", postID))
  
    if (!postSnap.exists()) {
      throw new Error("Post not found, please restart app")
    }

    return postSnap.data().comments
  } catch (e) {
    throw new Error(e.message)
  }
}
