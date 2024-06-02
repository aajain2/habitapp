import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export const getHabits = async () => {
  try {
    const request = await getDocs(collection(firestore, "habits"));
    let habits = []

    request.forEach((doc) => {
      const data = doc.data()
      habits.push(data)
    });

    return habits
  } catch (e) {
    throw new Error(e)
  }
}

export const saveHabit = async (uid, habit, habitDescription, prompt) => {
  try {
    await updateDoc(doc(firestore, "users", uid), {
      habit: habit,
      habitDescription: habitDescription,
      todaysPrompt: prompt
    })
  } catch (e) {
    throw new Error(e)
  }
}

export const getHabit = async (habitId) => {
  try {
    const postSnap = await getDoc(doc(firestore, "habits", habitId))
  
    if (!postSnap.exists()) {
      const defaultSnap = await getDoc(doc(firestore, "habits", "gym"))

      return {
        ...defaultSnap.data(),
        id: defaultSnap.id
      }
    }

    return {
      ...postSnap.data(),
      id: postSnap.id
    }
  } catch (e) {
    throw new Error(e.message)
  }
}
