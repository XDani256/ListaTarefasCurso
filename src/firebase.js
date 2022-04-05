// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8MYH21475u8am4jELczrLZsjIdM09hBA",
  authDomain: "listadetarefas-9bd0d.firebaseapp.com",
  projectId: "listadetarefas-9bd0d",
  storageBucket: "listadetarefas-9bd0d.appspot.com",
  messagingSenderId: "650656579414",
  appId: "1:650656579414:web:636a609356bb89acc6e0f7",
  measurementId: "G-K8HXJSWXFT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const storage = app.storage();
const functions = firebase.functions();

const analytics = getAnalytics(app);

export {db,auth,storage,functions};