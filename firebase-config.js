import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7V6m3bwt_y0fXAJEBPQGvs3V21DxBO44",
  authDomain: "emrs-63d1a.firebaseapp.com",
  projectId: "emrs-63d1a",
  storageBucket: "emrs-63d1a.firebasestorage.app",
  messagingSenderId: "736704623107",
  appId: "1:736704623107:web:6cbc49e1bca2677d8f5436",
  measurementId: "G-3HQCEBJ8JT"
};

// Initialize Firebase and export instances
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
