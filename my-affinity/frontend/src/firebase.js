import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your fully corrected Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg3tAUG_5OXt6udwk-V2IhwAkGxShTwHs",
  authDomain: "my-affinity-app.firebaseapp.com",
  projectId: "my-affinity-app",
  storageBucket: "my-affinity-app.firebasestorage.app",
  messagingSenderId: "627042523351",
  appId: "1:627042523351:web:134c3c89ee12628d92b892"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// We MUST export these so App.js can use them for the login button!
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();