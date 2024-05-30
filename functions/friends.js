import { doc, getDoc, getDocs, collection, query, where, documentId } from "firebase/firestore"
import { firestore } from "../firebaseConfig"

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