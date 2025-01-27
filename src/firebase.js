import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyChUcdipO-eB5H4ABGHkTCqeoUf_jbzjoU',
  authDomain: 'maaaps-4af92.firebaseapp.com',
  databaseURL: 'https://maaaps-4af92-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'maaaps-4af92',
  storageBucket: 'maaaps-4af92.appspot.com',
  messagingSenderId: '703821740519',
  appId: '1:703821740519:web:9cea697b55f1791d62e542'
}

export const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

export const placesRef = collection(db, 'places')
