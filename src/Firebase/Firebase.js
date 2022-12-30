// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjidhQGukGuOio9SQWhspw5QHBg9rMBD0",
  authDomain: "to-dooooo.firebaseapp.com",
  projectId: "to-dooooo",
  storageBucket: "to-dooooo.appspot.com",
  messagingSenderId: "657347918381",
  appId: "1:657347918381:web:6a9b81bc6ea1d67ef7d6a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app