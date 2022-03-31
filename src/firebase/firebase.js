// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "budget-app-4e2f9.firebaseapp.com",
  projectId: "budget-app-4e2f9",
  storageBucket: "budget-app-4e2f9.appspot.com",
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_ID_SENDER,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
};

// Initialize Firebase
export default initializeApp(firebaseConfig);
