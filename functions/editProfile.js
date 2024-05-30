import { doc, updateDoc } from "firebase/firestore"
import { firestore } from "../firebaseConfig"

export const saveEdit = async (uid, field, fieldValue) => {
  try {
    const data = {}

    data[field] = fieldValue

    console.log(data)

    await updateDoc(doc(firestore, "users", uid), data)
  } catch (e) {
    throw new Error(e)
  }
}