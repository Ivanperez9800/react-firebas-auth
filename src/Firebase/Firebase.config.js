// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDChDakD9LnMSfLLyseQeG0pEKZIbnoeb4",
  authDomain: "shopsite-db06a.firebaseapp.com",
  projectId: "shopsite-db06a",
  storageBucket: "shopsite-db06a.appspot.com",
  messagingSenderId: "622430377127",
  appId: "1:622430377127:web:3a265699af67f4e5e5b782",
  // measurementId: "G-NXLZ5PEGPF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const db = getFirestore(app);

export const auth = getAuth(app);
