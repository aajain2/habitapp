import { auth, firestore } from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'

// Registers a new user and initializes their profile in the database
export const handleNewUserRegistration = (data) => {
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      try {
        const docRef = await setDoc(doc(firestore, "users", user.uid), {
          firstName: data.firstName,
          lastName: data.lastName,
          birthday: data.birthday,
          username: data.username
        });
      } catch (e) {
        console.log("Error with creating document:", e)
      }

      console.log("User registration successful for:", data.email);
    })
    .catch((error) => {
      console.error("Error in user registration:", error);
      throw new Error("Failed to register new user.");
    });
}
