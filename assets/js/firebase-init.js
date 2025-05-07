// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCce9G6LfPKY9s7K5scs7My2s4V3TSP2D0",
  authDomain: "math-question-bank-b597b.firebaseapp.com",
  projectId: "math-question-bank-b597b",
  storageBucket: "math-question-bank-b597b.firebasestorage.app",
  messagingSenderId: "573557125465",
  appId: "1:573557125465:web:1663a8eaa44321ca5e9c48",
  measurementId: "G-1370BPC68M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the Firebase app instance if needed
export { app }; 