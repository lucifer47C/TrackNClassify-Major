// src/firebase.js
/*import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "Google-API-Key",
  authDomain: "tracknclassify.firebaseapp.com",
  databaseURL: "https://tracknclassify-default-rtdb.firebaseio.com",
  projectId: "tracknclassify",
  storageBucket: "tracknclassify.appspot.com",
  messagingSenderId: "924436702037",
  appId: "1:924436702037:web:ca6fdb9f8d864be7b505dc",
  measurementId: "G-JYM0W1WM9G"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export { auth };*/
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Google API Key",
  authDomain: "tracify-7d9d9.firebaseapp.com",
  projectId: "tracify-7d9d9",
  storageBucket: "tracify-7d9d9.appspot.com",
  messagingSenderId: "244863610218",
  appId: "1:244863610218:web:4286269cdc265774964913",
  measurementId: "G-42V7H2EM73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, app, analytics };
