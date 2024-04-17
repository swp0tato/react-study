import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBxQLmaaNON3DULp6-5HNV81vySYn0UWek",
  authDomain: "noonaproject-c5219.firebaseapp.com",
  projectId: "noonaproject-c5219",
  storageBucket: "noonaproject-c5219.appspot.com",
  messagingSenderId: "1050239311179",
  appId: "1:1050239311179:web:853898b23ad2e79b825cce",
  measurementId: "G-DNBZ9QPDKE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export default app;
