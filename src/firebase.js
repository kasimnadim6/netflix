import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCUY-_txk-LsMa_nJYArFGFJZkh3PMF28M',
  authDomain: 'netflix-de158.firebaseapp.com',
  projectId: 'netflix-de158',
  storageBucket: 'netflix-de158.appspot.com',
  messagingSenderId: '720636866781',
  appId: '1:720636866781:web:915002b673cd81a867eb34',
  measurementId: 'G-Z46FKBNZN6',
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { auth };
export default db;
