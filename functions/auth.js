import { auth, firestore } from '../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
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
      avatar: "https://firebasestorage.googleapis.com/v0/b/trabitapp.appspot.com/o/Assets%2Favatar.png?alt=media&token=9b2d3388-8ade-48b3-9017-d319ae5cf21d",
      friends: [],
      habit: "",
      completedToday: false,
      streak: 0,
      outgoingRequests: [],
      incomingRequests: []
    })

    return user.user.uid
  } catch (e) {
    throw new Error(e)
  }
}

export const getCurrentUser = async () => {
  try {
    const user = auth.currentUser    

    if (user) {
      const userDoc = await getDoc(doc(firestore, "users", user.uid))

      return {
        ...userDoc.data(),
        uid: user.uid,
        email: user.email,
      }
    } else {
      return null
    }
  } catch (e) {
    throw new Error(e)
  }
}

export const handleLogIn = async (email, password) => {
  try {
    const success = await signInWithEmailAndPassword(auth, email, password)

    return success
  } catch (e) {
    throw new Error(e)
  }
}

export const handleLogOut = async () => {
  try {
    await signOut(auth)
  } catch (e) {
    throw new Error(e)
  }
}
