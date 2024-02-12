// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "skyline-estate-e603b.firebaseapp.com",
    projectId: "skyline-estate-e603b",
    storageBucket: "skyline-estate-e603b.appspot.com",
    messagingSenderId: "865826162198",
    appId: "1:865826162198:web:1acfb6be1e4f1faece9737",
    measurementId: "G-WCY1TH8WBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;