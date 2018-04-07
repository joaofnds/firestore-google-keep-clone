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
 * Gets the reference to a user note
 *
 * @param {String} userID Self descriptive
 * @param {String} noteID Self descriptive
 */
function noteRef(userID, noteID) {
  return notesRef(userID).doc(noteID);
}

/**
 * Gets all user notes
 *
 * @param {String} userID Self descriptive
 */
export function getAllNotes(userID) {
  return notesRef(userID).get();
}

/**
 * Sets a user note
 *
 * @param {String} userID Self descriptive
 * @param {String} noteID Self descriptive
 * @param {{title: String, body: String}} note Note to be set
 */
export function setNote(userID, noteID, note) {
  return noteRef(userID, noteID).set(note);
}
