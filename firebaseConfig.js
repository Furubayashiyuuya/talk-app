/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTz7WRVfaQergkV7Szr6gmVarhBHYCnpI",
  authDomain: "talk-95e0a.firebaseapp.com",
  databaseURL: "https://talk-95e0a-default-rtdb.firebaseio.com",
  projectId: "talk-95e0a",
  storageBucket: "talk-95e0a.appspot.com",
  messagingSenderId: "348990437531",
  appId: "1:348990437531:web:beb9f0e897cae19c322e3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCTz7WRVfaQergkV7Szr6gmVarhBHYCnpI",
  authDomain: "talk-95e0a.firebaseapp.com",
  databaseURL: "https://talk-95e0a-default-rtdb.firebaseio.com",
  projectId: "talk-95e0a",
  storageBucket: "talk-95e0a.appspot.com",
  messagingSenderId: "348990437531",
  appId: "1:348990437531:web:beb9f0e897cae19c322e3e",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default database;