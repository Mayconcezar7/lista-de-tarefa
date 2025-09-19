import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAybIrHh81QRNGqkdrkIUiMbLksDMdqe-c",
  authDomain: "curso-cd820.firebaseapp.com",
  projectId: "curso-cd820",
  storageBucket: "curso-cd820.firebasestorage.app",
  messagingSenderId: "1030563531100",
  appId: "1:1030563531100:web:ee1f87c90e5c29b561d999",
  measurementId: "G-DNMSTER6D7"
};


const firebaseapp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseapp)
const auth = getAuth(firebaseapp)

export{db, auth};