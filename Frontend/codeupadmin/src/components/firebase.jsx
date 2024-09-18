import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoHqoWzSnuYrVsgvv2Z1mS3f_xhyAD9hc",
  authDomain: "auth-login-4fd70.firebaseapp.com",
  projectId: "auth-login-4fd70",
  storageBucket: "auth-login-4fd70.appspot.com",
  messagingSenderId: "668426304070",
  appId: "1:668426304070:web:7c046b1a9a6614c87e6847"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();

export default app;