// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcYjOb3aHP_bCEHxcireMuGJsINqpNsuI",
  authDomain: "enefti-5d110.firebaseapp.com",
  projectId: "enefti-5d110",
  storageBucket: "enefti-5d110.appspot.com",
  messagingSenderId: "759473350585",
  appId: "1:759473350585:web:4f7a3f49690bcbe54bb868"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };