import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYZcqU1hGWN9dQlNX6QoeBdSj8OYIT3PM",
  authDomain: "chat-app-c21b5.firebaseapp.com",
  databaseURL:
    "https://chat-app-c21b5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-c21b5",
  storageBucket: "chat-app-c21b5.appspot.com",
  messagingSenderId: "839842329866",
  appId: "1:839842329866:web:f5c514b88690d5182eb6f3",
  measurementId: "G-Q34QZNJS3D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();

export default app;
export { auth };
