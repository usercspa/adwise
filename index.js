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
const adviceContainer = document.getElementById('advice-container');

const form = document.getElementById('getAdvice');
const input1 = document.getElementById('id1');
const input2 = document.getElementById('id2');
const input3 = document.getElementById('id3');
const input4 = document.getElementById('id4');
const input5 = document.getElementById('id5');
const input6 = document.getElementById('id6');
const results = document.getElementById('displayAdvice');


var loginListener = null;
var resultsListener = null;

async function main() {

  // Add Firebase project configuration object here

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

// Called when the user clicks the RSVP button
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
// ...
// Listen to the current Auth state
firebase.auth().onAuthStateChanged((user) => {
 if (user){
   loginButton.textContent = "LOGOUT";
   // Show guestbook to logged-in users
   adviceContainer.style.display = "block";
   subscribeResults();
 }
 else{
   loginButton.textContent = "Login/ Register";
   // Hide guestbook for non-logged-in users
   adviceContainer.style.display = "none";
   unsubscribeResults();
 }
});

// ..
// Listen to the form submission
form.addEventListener("submit", (e) => {
 // Prevent the default form redirect
 e.preventDefault();
 // Write a new message to the database collection "guestbook"
 firebase.firestore().collection("getAdvice").add({
   text: input.value,
   timestamp: Date.now(),
   name: firebase.auth().currentUser.displayName,
   userId: firebase.auth().currentUser.uid
 })
 // clear message input field
 input.value = ""; 
 // Return false to avoid redirect
 return false;
});


function subscribeResults(){
   // Create query for messages
 getAdviceListener = firebase.firestore().collection("getAdvice")
 .orderBy("timestamp","desc")
 .onSnapshot((snaps) => {
   // Reset page
   getAdvice.innerHTML = "";
   // Loop through documents in database
   snaps.forEach((doc) => {
     // Create an HTML entry for each document and add it to the chat
     const entry = document.createElement("p");
     entry.textContent = doc.data().name + ": " + doc.data().text;
     getAdvice.appendChild(entry);
   });
 });
};


function unsubscribeResults(){
 if (resultsListener != null)
 {
   resultsListener();
   resultsListener = null;
 }
};

}


main();



