import { initializeApp } from "firebase/app";
import { getAuth, EmailAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClJZqBy3KW5NunjQPTRHhpPoGacc-pqT4",
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

export { auth, EmailAuthProvider };
