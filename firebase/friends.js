import { getDocs, collection, query, where, documentId, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { auth, firestore } from "../firebaseConfig"
import { splitArrayByTen } from "../util/splitArrayByTen"

export const getFriendData = async (uidList) => {
  try {
    const friends = []
    const nestedUID = splitArrayByTen(uidList)

    for (const array of nestedUID) {
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
    const querySnapshot = await getDocs(collection(firestore, "users"))
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

export const acceptFriendRequest = async (accepterUID, requesterUID) => {
  try {
    // Set accepter's information
    await updateDoc(doc(firestore, "users", accepterUID), {
      incomingRequests: arrayRemove(requesterUID),
      friends: arrayUnion(requesterUID)
    })

    // Set requester's information
    await updateDoc(doc(firestore, "users", requesterUID), {
      outgoingRequests: arrayRemove(accepterUID),
      friends: arrayUnion(accepterUID)
    })
  } catch (e) {
    throw new Error(e.message)
  }
}

export const removeFriendRequest = async (accepterUID, requesterUID) => {
  try {
    // Set accepter's information
    await updateDoc(doc(firestore, "users", accepterUID), {
      incomingRequests: arrayRemove(requesterUID)
    })

    // Set requester's information
    await updateDoc(doc(firestore, "users", requesterUID), {
      outgoingRequests: arrayRemove(accepterUID)
    })
  } catch (e) {
    throw new Error(e.message)
  }
}

export const removeFriend = async (accepterUID, requesterUID) => {
  try {
    // Set accepter's information
    await updateDoc(doc(firestore, "users", accepterUID), {
      friends: arrayRemove(requesterUID)
    })

    // Set requester's information
    await updateDoc(doc(firestore, "users", requesterUID), {
      friends: arrayRemove(accepterUID)
    })
  } catch (e) {
    throw new Error(e.message)
  }
}
