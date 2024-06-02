import { storage, firestore, auth } from '../firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { collection, doc, documentId, getDoc, getDocs, increment, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { splitArrayByTen } from '../util/splitArrayByTen';
import { convertFirebaseTimestamp } from '../util/convertFirebaseTimestamp';

export const getReport = async (uidList) => {
  try {
    const slackersUID = []
    const nestedUID = splitArrayByTen(uidList)

    for (const array of nestedUID) {
      const slackerRef = collection(firestore, "nonCompleters")

      const q = query(slackerRef, where(documentId(), "in", array))
      const querySnapshot = await getDocs(q)
  
      querySnapshot.forEach((doc) => {
        slackersUID.push(doc.id)
      })
    }

    const slackers = []

    for (const uid of slackersUID) {
      const userRef = doc(firestore, "users", uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        throw new Error("User not found, please restart app")
      }

      slackers.push(userSnap.data())
    }

    return slackers
  } catch (e) {
    throw new Error(e.message)
  } 
}