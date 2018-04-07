import { auth } from "firebase";

const signInProvider = new auth.GoogleAuthProvider();

/**
 * Signs in the user using Google Auth Provider
 */
export function signIn() {
  return auth().signInWithPopup(signInProvider);
}

/**
 * Sign out the current logged in user
 */
export function signOut() {
  return auth().signOut();
}
