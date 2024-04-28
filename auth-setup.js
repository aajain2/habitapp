import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import firebaseConfig from './firebase-config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
  'size': 'invisible', // or 'normal' for the visible widget
  'callback': (response) => {
    // reCAPTCHA solved - allow signInWithPhoneNumber.
  }
}, auth);
recaptchaVerifier.render();

document.getElementById('sign-in-button').addEventListener('click', function() {
  const phoneNumber = document.getElementById('phone-number').value;
  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Ask user to input the code
      const code = window.prompt("Enter the verification code");
      return confirmationResult.confirm(code);
    })
    .then((result) => {
      // User signed in successfully.
      console.log('User signed in', result.user);
    })
    .catch((error) => {
      console.error('Error during signInWithPhoneNumber', error);
    });
});
