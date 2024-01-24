import { initializeApp } from "firebase/app"
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import {firebaseConfig} from '@/firebase.config'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

const public_photosCollection = collection(db, 'public_photos')
const usersCollection = collection(db, 'users')
const sharedCollection = collection(db, 'shared')

export {
  db,
  app,
  auth,
  public_photosCollection,
  usersCollection,
  sharedCollection,
}