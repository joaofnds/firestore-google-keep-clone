import "firebase/firestore";
import { firestore } from "firebase";

// Collection names
const COLLECTION = {
  USERS: "users",
  NOTES: "notes"
};

/**
 * Gets the reference to user notes
 *
 * @param {String} userID Self descriptive
 */
function notesRef(userID) {
  return firestore()
    .collection(COLLECTION.USERS)
    .doc(userID)
    .collection(COLLECTION.NOTES);
}

/**
 * Gets all user notes
 *
 * @param {String} userID Self descriptive
 */
export function getAllNotes(userID) {
  return notesRef(userID).get();
}
