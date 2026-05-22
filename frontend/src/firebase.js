import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQ8VosXGMxIFs5TEoCFf1UBRoyPNmd9Rw",
  authDomain: "silentvoice-6a0b0.firebaseapp.com",
  projectId: "silentvoice-6a0b0",
  storageBucket: "silentvoice-6a0b0.firebasestorage.app",
  messagingSenderId: "876046014869",
  appId: "1:876046014869:web:e9fe3d7658bf0f07bbfe9c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;