import firebase from 'firebase/app';
import 'firebase/database'

firebase.initializeApp({
    apiKey: "AIzaSyBGutShjtv7zlFCPlPngrvLMTbizK90z-A",
    authDomain: "namaikan.firebaseapp.com",
    projectId: "namaikan",
    storageBucket: "namaikan.appspot.com",
    messagingSenderId: "585315428673",
    appId: "1:585315428673:web:b4c17736d6ee377de699c0",
    measurementId: "G-9YWMQD8CM7"
  });

const FIREBASE = firebase;

export default FIREBASE;