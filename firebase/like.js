import { arrayRemove, arrayUnion, doc, increment, updateDoc } from "firebase/firestore"
import { auth, firestore } from "../firebaseConfig"

export const likePost = async (postId) => {
  try {
    const currentUserUID = auth.currentUser.uid

    await updateDoc(doc(firestore, "posts", postId), {
      likes: increment(1),
      likers: arrayUnion(currentUserUID)
    })
  } catch (e) {
    throw new Error(e)
  }
}

export const unlikePost = async (postId) => {
  try {
    const currentUserUID = auth.currentUser.uid

    await updateDoc(doc(firestore, "posts", postId), {
      likes: increment(-1),
      likers: arrayRemove(currentUserUID)
    })
  } catch (e) {
    throw new Error(e)
  }
}