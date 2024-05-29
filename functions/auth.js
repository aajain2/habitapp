import { auth, firestore } from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import validator from 'validator'

// Registers a new user and initializes their profile in the database
export const handleNewUserRegistration = async (data) => {
  if (!validator.isStrongPassword(data.password)) {
    throw new Error("Password not strong enough")
  }

  try {
    const user = await createUserWithEmailAndPassword(auth, data.email, data.password)

    if (!user) {
      throw new Error("Could not create user")
    }

    await setDoc(doc(firestore, "users", user.user.uid), {
      firstName: data.firstName,
      lastName: data.lastName,
      birthday: data.birthday,
      username: data.username,
      avatar: "",
    })

    return user.user.uid
  } catch (e) {
    throw new Error(e)
  }
}
