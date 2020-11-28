// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const loginButton = document.getElementById('login');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');

async function main() {

  // Add Firebase project configuration object here
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCjenEqWmXfr-bCVU5vRiry2ondQbXhrOU",
    authDomain: "learn-e1cb6.firebaseapp.com",
    databaseURL: "https://learn-e1cb6.firebaseio.com",
    projectId: "learn-e1cb6",
    storageBucket: "learn-e1cb6.appspot.com",
    messagingSenderId: "1004044510119",
    appId: "1:1004044510119:web:c4754e5d286e8ad280cc82"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      }
    }
  };

  const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Called when the user clicks the login button
loginButton.addEventListener("click",
 () => {
    if (firebase.auth().currentUser) {
      // User is signed in; allows user to sign out
      firebase.auth().signOut();
    } else {
      // No user is signed in; allows user to sign in
      ui.start("#firebaseui-auth-container", uiConfig);
    }
});
// Listen to the current Auth state
firebase.auth().onAuthStateChanged((user)=> {
  if (user) {
    loginButton.textContent = "LOGOUT"
  }
  else {
    loginButton.textContent = "Login/ Register"
  }
});



}


main();
