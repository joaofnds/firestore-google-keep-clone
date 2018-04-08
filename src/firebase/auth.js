import { auth } from "firebase";

const firebaseAuth = auth();
const signInProvider = new auth.GoogleAuthProvider();

/**
 * Signs in the user using Google Auth Provider
 */
export function signIn() {
  return new Promise((resolve, reject) => {
    firebaseAuth
      .setPersistence(auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebaseAuth
          .signInWithPopup(signInProvider)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
}

/**
 * Signs out the current logged in user
 */
export function signOut() {
  return firebaseAuth.signOut();
}
