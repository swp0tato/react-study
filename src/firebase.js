import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const apikey = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: `${apikey}`,
  authDomain: "noonaproject-c5219.firebaseapp.com",
  projectId: "noonaproject-c5219",
  storageBucket: "noonaproject-c5219.appspot.com",
  messagingSenderId: "1050239311179",
  appId: "1:1050239311179:web:853898b23ad2e79b825cce",
  measurementId: "G-DNBZ9QPDKE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
export { db, storage };
