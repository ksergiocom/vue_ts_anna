import { initializeApp } from "firebase/app"
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth,onAuthStateChanged } from 'firebase/auth'


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
const auth = getAuth(app)

const public_photosCollection = collection(db, 'public_photos')
const usersCollection = collection(db, 'users')
const sharedCollection = collection(db, 'shared')

onAuthStateChanged(auth, (user) => {
  if(user){
    console.log('User signed in!')
  }else{
    console.log('User signed out!')
  }
})

export {
  db,
  app,
  auth,
  public_photosCollection,
  usersCollection,
  sharedCollection,
}