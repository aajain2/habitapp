import { getDocs, collection, query, where, documentId, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { auth, firestore } from "../firebaseConfig"

const splitArray = (arr) => {
  const nestedArray = []
  for (let i = 0; i < arr.length; i += 10) {
    nestedArray.push(arr.slice(i, i + 10))
  }
  return nestedArray
}

export const getFriendData = async (uidList) => {
  try {
    const friends = []
    const nestedUID = splitArray(uidList)

    for (array in nestedUID) {
      const userRef = collection(firestore, "users")

      const q = query(userRef, where(documentId(), "in", uidList))
      const querySnapshot = await getDocs(q)
  
      querySnapshot.forEach((doc) => {
        friends.push({
          ...doc.data(),
          uid: doc.id
        })
      })
    }

    return friends
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getAllUsers = async () => {
  try {
    const users = []
    const userRef = collection(firestore, "users")
    const querySnapshot = await getDocs(userRef)
    const uid = auth.currentUser.uid

    querySnapshot.forEach((doc) => {
      if (doc.id !== uid) {
        users.push({
          ...doc.data(),
          uid: doc.id
        })
      }
    })

    return users
  } catch (e) {
    throw new Error(e.message)
  }
}

export const requestFriend = async (requesterUID, recipientUID) => {
  try {
    // Setting own outgoingRequests
    await updateDoc(doc(firestore, "users", requesterUID), {
      outgoingRequests: arrayUnion(recipientUID)
    })

    // Setting recipients incomingRequests
    await updateDoc(doc(firestore, "users", recipientUID), {
      incomingRequests: arrayUnion(requesterUID)
    })

    console.log("Success")
  } catch (e) {
    throw new Error(e.message)
  }
}

export const unrequestFriend = async (requesterUID, recipientUID) => {
  try {
    // Setting own outgoingRequests
    await updateDoc(doc(firestore, "users", requesterUID), {
      outgoingRequests: arrayRemove(recipientUID)
    })

    // Setting recipients incomingRequests
    await updateDoc(doc(firestore, "users", recipientUID), {
      incomingRequests: arrayRemove(requesterUID)
    })
  } catch (e) {
    throw new Error(e.message)
  }
}
