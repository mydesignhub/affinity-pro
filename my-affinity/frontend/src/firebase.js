import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // 👈 1. Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAg3tAUG_5OXt6udwk-V2IhwAkGxShTwHs",
  authDomain: "my-affinity-app.firebaseapp.com",
  projectId: "my-affinity-app",
  storageBucket: "my-affinity-app.firebasestorage.app",
  messagingSenderId: "627042523351",
  appId: "1:627042523351:web:134c3c89ee12628d92b892"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // 👈 2. Export the 'db' variable