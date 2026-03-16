import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg3tAUG_50Xt6udwk-V2IhwAkGxShTwHs",
  authDomain: "my-affinity-app.firebaseapp.com",
  projectId: "my-affinity-app",
  storageBucket: "my-affinity-app.firebasestorage.app",
  messagingSenderId: "627042523351",
  appId: "1:627042523351:web:134c3c89ee12628d92b892"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication tools so we can use them in App.js
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();