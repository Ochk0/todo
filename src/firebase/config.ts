// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCRJtqd_x6a-8nAw1rJiTI8WT3zI1Zvw8",
  authDomain: "todo-f7263.firebaseapp.com",
  projectId: "todo-f7263",
  storageBucket: "todo-f7263.appspot.com",
  messagingSenderId: "1091751192091",
  appId: "1:1091751192091:web:81a26d59813a80c421fabe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
