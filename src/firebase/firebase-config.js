import firebase from 'firebase/app'
import 'firebase/auth'
  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_KEY_FB,
    authDomain: "veterinaria-js-net.firebaseapp.com",
    projectId: "veterinaria-js-net",
    storageBucket: "veterinaria-js-net.appspot.com",
    messagingSenderId: "707280826684",
    appId: process.env.REACT_APP_APPID
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{
    googleAuthProvider,
    firebase
}



