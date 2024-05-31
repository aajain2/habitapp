import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export const getHabits = async () => {
  try {
    const request = await getDocs(collection(firestore, "habits"));
    let habits = []

    request.forEach((doc) => {
      const data = doc.data()

      habits.push({
        id: doc.id,
        description: data.description,
        name: data.name,
        prompts: data.prompts
      })
    });

    return habits
  } catch (e) {
    throw new Error(e)
  }
}

export const saveHabit = async (uid, habit, habitDescription) => {
  try {
    await updateDoc(doc(firestore, "users", uid), {
      habit: habit,
      habitDescription: habitDescription
    })
  } catch (e) {
    throw new Error(e)
  }
}
