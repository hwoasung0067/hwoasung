import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQKF3jYIX6k2LWDSUwcVMZrj6SKtH51fQ",
    authDomain: "hwoasung-b20ff.firebaseapp.com",
    projectId: "hwoasung-b20ff",
    storageBucket: "hwoasung-b20ff.firebasestorage.app",
    messagingSenderId: "917869348806",
    appId: "1:917869348806:web:05576453c6644a369494c7",
    measurementId: "G-9NS8FC41WC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, storage, db, auth };
