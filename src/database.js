// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHHHeTy1NrO8rCUnwGGq6ooXIV0AUsHRc",
  authDomain: "juevovue.firebaseapp.com",
  databaseURL: "https://juevovue-default-rtdb.firebaseio.com",
  projectId: "juevovue",
  storageBucket: "juevovue.appspot.com",
  messagingSenderId: "554333434514",
  appId: "1:554333434514:web:2408f643c5a6925bba2c4b",
  measurementId: "G-F8ERC8WNSM",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
