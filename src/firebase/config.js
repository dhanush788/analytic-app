import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyC_b43vHHhi5awGyrEdeHXpjT-X-0AhJuk",
  authDomain: "analytic-page.firebaseapp.com",
  projectId: "analytic-page",
  storageBucket: "analytic-page.appspot.com",
  messagingSenderId: "1008309696899",
  appId: "1:1008309696899:web:45898d890bd98ecf661eb6",
  measurementId: "G-Q1WNM4992R"
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);