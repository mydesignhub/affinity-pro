import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyBKKlLxvPuILI45iDW5XVu0oRm2LQyLyf8",
  authDomain: "mydesignpro-app.firebaseapp.com",
  projectId: "mydesignpro-app",
  storageBucket: "mydesignpro-app.firebasestorage.app",
  messagingSenderId: "498282920358",
  appId: "1:498282920358:web:3078c712b0d2e4ea03f767",
  measurementId: "G-ZK4P6DH2PG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);