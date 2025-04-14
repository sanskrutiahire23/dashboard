// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your Firebase configuration (from Firebase Console)
 
const firebaseConfig = {
    apiKey: "AIzaSyDALYzJkZwJy3V2aYXiJdatVIOXZV7QFV8",
    authDomain: "signup-57a41.firebaseapp.com",
    projectId: "signup-57a41",
    storageBucket: "signup-57a41.firebasestorage.app",
    messagingSenderId: "1078593068389",
    appId: "1:1078593068389:web:229c8b86c15f3dcd57558c",
    measurementId: "G-H66T9T6GXS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In Function
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("User Info: ", result.user);
        return result.user; // Returns user details
    } catch (error) {
        console.error("Google Sign-In Error", error);
    }
};

// Logout Function
export const logout = async () => {
    try {
        await signOut(auth);
        console.log("User signed out");
    } catch (error) {
        console.error("Logout Error", error);
    }
};

export { auth };
