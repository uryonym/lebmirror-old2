import * as firebase from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_SENDER_ID,
}

if (typeof window !== 'undefined' && !firebase.getApps().length) {
  firebase.initializeApp(firebaseConfig)
}

export const getFirebaseAuth = (): Auth => getAuth()
export { firebase }
