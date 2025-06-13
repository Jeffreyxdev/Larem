
// src/DB/Firebase.ts (or wherever you put your Firebase config)
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  // PhoneAuthProvider, // You don't need to import PhoneAuthProvider directly for this common flow
  RecaptchaVerifier,
 
  signInWithPhoneNumber, // <--- Import this
  updateProfile // Make sure this is imported if used in signUpWithEmail
} from "firebase/auth";
import type { ConfirmationResult } from "firebase/auth";
// Your Firebase configuration (from your Firebase project settings)
const firebaseConfig = {
   apiKey: "AIzaSyB6I5UxuGCKvAG8H6q14pNALlyDygDnqXM",
  authDomain: "lemren.firebaseapp.com",
  projectId: "lemren",
  storageBucket: "lemren.firebasestorage.app",
  messagingSenderId: "1018234826343",
  appId: "1:1018234826343:web:a02411530152630e5a2ec2",
  measurementId: "G-VX9E0E1K1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// --- Global reCAPTCHA Verifier ---
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult | null; // To store phone auth confirmation result
  }
}

export const setUpRecaptcha = (containerId: string) => {
  if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      containerId, // This is the ID of your reCAPTCHA container div
      {
        size: "invisible", // or "normal" for a visible widget
        callback: (response: string) => {
          console.log("reCAPTCHA solved:", response);
        },
        'expired-callback': () => {
          console.warn("reCAPTCHA expired. Please try again.");
          window.recaptchaVerifier.render().then((widgetId: number) => {
            (window as any).grecaptcha.reset(widgetId);
          });
        }
      },
      auth
    );
    console.log("reCAPTCHA verifier initialized.");
  }
};

// --- Email and Password Functions ---
export const signUpWithEmail = async (email: string, password: string, displayName: string | null = null) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (displayName && user) {
      await updateProfile(user, { displayName: displayName });
    }
    console.log("Email sign-up successful:", user);
    return user;
  } catch (error: any) {
    console.error("Email sign-up error:", error.message);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Email sign-in successful:", user);
    return user;
  } catch (error: any) {
    console.error("Email sign-in error:", error.message);
    throw error;
  }
};

// --- Google Sign-in Function ---
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google sign-in successful:", user);
    return user;
  } catch (error: any) {
    console.error("Google sign-in error:", error.message);
    throw error;
  }
};

// --- Phone Authentication Functions ---
// Step 1: Send the verification code
export const sendPhoneVerificationCode = async (phoneNumber: string) => {
  try {
    // Ensure reCAPTCHA verifier is available
    if (!window.recaptchaVerifier) {
      throw new Error("reCAPTCHA verifier not initialized. Call setUpRecaptcha first.");
    }
    // Correct method for sending SMS code
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);

    // Store the confirmationResult globally or pass it back to the component
    window.confirmationResult = confirmationResult;
    console.log("Phone verification code sent.");
    return confirmationResult;
  } catch (error: any) {
    console.error("Error sending phone verification code:", error.message);
    throw error;
  }
};

// Step 2: Confirm the verification code
export const confirmPhoneNumberSignIn = async (otpCode: string) => {
  try {
    if (!window.confirmationResult) {
      throw new Error("No pending phone verification. Send code first.");
    }
    const userCredential = await window.confirmationResult.confirm(otpCode);
    const user = userCredential.user;
    console.log("Phone number confirmed. User:", user);
    // Clear the stored confirmation result
    window.confirmationResult = null;
    return user;
  } catch (error: any) {
    console.error("Error confirming phone number:", error.message);
    throw error;
  }
};

// --- Sign Out Function (General) ---
export const signOutUser = async () => {
  try {
    await firebaseSignOut(auth);
    console.log("User signed out.");
  } catch (error: any) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};