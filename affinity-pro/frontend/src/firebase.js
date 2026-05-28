import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ─── Affinity Pro — Firebase Project ─────────────────────────────────────────
// Values come from .env.local (gitignored).
// To use a NEW Firebase project, update .env.local with your new project's config.
// See .env.example for the template.
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// ─── App namespace ────────────────────────────────────────────────────────────
// Prefixes every Firestore collection so this app's data stays separate
// from other apps sharing the same Firebase project.
// Change 'ap' to any short unique ID for this app (e.g. 'gd' for Graphic Design).
// ─────────────────────────────────────────────────────────────────────────────
export const APP_NS = 'ap';

// Helper: returns a namespaced collection name, e.g. C('users') → 'ap_users'
export const C = (name) => `${APP_NS}_${name}`;
