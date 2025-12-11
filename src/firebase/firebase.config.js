// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY5Xu2I7e0lClq_cy-3whdCtwBaEe28cU",
  authDomain: "paw-mart-702b8.firebaseapp.com",
  projectId: "paw-mart-702b8",
  storageBucket: "paw-mart-702b8.firebasestorage.app",
  messagingSenderId: "914443918300",
  appId: "1:914443918300:web:205ccf7af261059af50d19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;