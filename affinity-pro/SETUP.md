# Affinity Pro — New Project Setup Guide

## ✅ Already Done (Automatically Separated)

| What | Old (Affinity iPad) | New (Affinity Pro) |
|------|--------------------|--------------------|
| App title | Affinity iPad | **Affinity Pro** |
| PWA name | Affinity iPad Masterclass | **Affinity Pro Masterclass** |
| Header branding | AffinityiPad | **AffinityPro** |
| Footer text | © 2026 Affinity iPad | **© 2026 Affinity Pro** |
| localStorage prefix | `myAffinity_*` | **`affinityPro_*`** |
| Device ID key | `myDesign_deviceId` | **`affinityPro_deviceId`** |
| Firebase config | Hardcoded | **Environment variables** |
| Contact links | myaffinity.* URLs | Placeholder (see below) |

---

## 🔥 Step 1 — Create a New Firebase Project (REQUIRED for full separation)

1. Go to → [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it e.g. `affinity-pro-app`
3. Inside the project, go to **Project Settings** → **Your apps** → Add a **Web app**
4. Copy the `firebaseConfig` object values
5. Open `frontend/.env.local` and replace the `VITE_FIREBASE_*` values with your new project's values

> **Why?** Both apps currently share the same Firebase project (`mydesignpro-app`).
> Once you swap to a new project, their users, purchases, and AI data will be completely separate.

### Enable these Firebase services for the new project:
- **Authentication** → Sign-in methods: Google + Email/Password
- **Firestore Database** → Start in production mode
- **Firestore Collections** needed (create manually or they auto-create):
  - `users` — stores user purchase records
  - `activationCodes` — one-time license keys
  - `keyActivations` — consumed key records with device tracking
  - `purchaseRequests` — QR payment submissions awaiting approval
  - `ai_knowledge` — optional live AI knowledge base entries

---

## 🔗 Step 2 — Update Contact Links

Edit `frontend/src/components/layout/ContactSection.jsx` — top of the file:

```js
const SOCIAL_LINKS = {
    facebook: 'https://web.facebook.com/YOUR_PAGE',   // ← your Facebook page
    telegram: 'https://t.me/koymy',                   // ← your Telegram
    website:  'https://YOUR_WEBSITE.com',             // ← your website / Gumroad
};
```

---

## 🤖 Step 3 — Backend AI Keys

The backend (`backend/.env`) can keep the same Gemini keys, or add new ones.
When you deploy, update `ALLOWED_ORIGINS` to your production URL:

```env
ALLOWED_ORIGINS=http://localhost:5173,https://your-affinity-pro-domain.com
```

---

## 👤 Step 4 — Admin Email

In `frontend/src/components/layout/Header.jsx`, line 10:
```js
const ADMIN_EMAIL = 'koymy.mlk@gmail.com'; // ← change if you want a different admin
```

---

## 🚀 Running the App

```bash
# Frontend
cd affinity-pro/frontend
npm install
npm run dev

# Backend (separate terminal)
cd affinity-pro/backend
node server.js
```
