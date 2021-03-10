import firebase from 'firebase/app'
import 'firebase/auth'
  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWA7IQ5gh512f1kVNqJMk43Ur6eCDYCuk",
    authDomain: "veterinaria-js-net.firebaseapp.com",
    projectId: "veterinaria-js-net",
    storageBucket: "veterinaria-js-net.appspot.com",
    messagingSenderId: "707280826684",
    appId: "1:707280826684:web:e87efc6947d4087992ee39"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{
    googleAuthProvider,
    firebase
}



