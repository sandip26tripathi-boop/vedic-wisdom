import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Official Vedic Wisdom Firebase configuration provided by client
export const firebaseConfig = {
  apiKey: "AIzaSyAhLyD9nGt9Fl-nBv9JwWZn6nmA23xhZEg",
  authDomain: "geminiastro-b043e.firebaseapp.com",
  projectId: "geminiastro-b043e",
  storageBucket: "geminiastro-b043e.firebasestorage.app",
  messagingSenderId: "239984509173",
  appId: "1:239984509173:web:995dcb2d73dc61d87a45bc",
  measurementId: "G-QB2CSPC0Z4"
};

// Initialize Firebase App instance safely (prevent duplicate app creation)
export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(firebaseApp);

// Configure Google Auth Provider with prompt: 'select_account'
export const googleProvider = new GoogleAuthProvider();
// Yah line har baar 'Choose an account' ki screen laati hai:
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Analytics if supported in the browser
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(firebaseApp);
    }
  }).catch(() => {
    // Analytics initialization failed or not supported in this environment
  });
}

/**
 * Triggers Google Sign In popup using Firebase Auth.
 * Instantiates a fresh GoogleAuthProvider with prompt: 'select_account'
 * so Google always shows the 'Choose an account' screen every single time.
 */
export async function signInWithGoogleFirebase(): Promise<FirebaseUser> {
  const provider = new GoogleAuthProvider();
  // Har baar 'Choose an account' pop-up screen aayegi:
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  provider.addScope('email');
  provider.addScope('profile');
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

/**
 * Signs out the current user from Firebase Auth
 */
export async function logoutFromFirebase(): Promise<void> {
  await signOut(auth);
}

/**
 * Subscribes to Firebase Auth state changes
 */
export function onFirebaseAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export type { FirebaseUser };
