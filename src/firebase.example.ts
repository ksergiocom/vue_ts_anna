import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyA7oL3AF-w5WqgFfbz32H1kk278Y-NfzWI",
  authDomain: "jam-anna.firebaseapp.com",
  projectId: "jam-anna",
  storageBucket: "jam-anna.appspot.com",
  messagingSenderId: "5307014907",
  appId: "1:5307014907:web:1d8c6416b9da60ac43da5e"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}