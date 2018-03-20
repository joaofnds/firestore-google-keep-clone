import {
  setNote as setFirebaseNote,
  deleteNote as deleteFirebaseNote
} from "../firebase/notes";

import showNotification from "../common/showNotification";

export function setNotes(context, notes) {
  context.commit("SET_NOTES", notes);
}

export function setNote(context, { noteID, note }) {
  const userID = context.state.user.uid;

  // Commit changes to state
  context.commit("ADD_NOTE", { noteID, note });

  // Set note to firestore
  setFirebaseNote(userID, noteID, note)
    .then(() => showNotification("Note saved"))
    .catch(err => {
      showNotification("Failed to save note on Firestore");
      throw new Error("Failed to save note to firebase", err);
    });
}

export function deleteNote(context, noteID) {
  const userID = context.state.user.uid;
  const note = context.state.notes[noteID];

  // Commit changes to state
  context.commit("DELETE_NOTE", noteID);

  // Delete note from firestore
  deleteFirebaseNote(userID, noteID)
    .then()
    .catch(err => {
      throw new Error("Failed to delete note", err);
    });

  // Display notification
  showNotification("Note deleted", 2000, "UNDO", () => {
    setNote(context, { noteID, note });
  });
}

export function setUser(context, user) {
  context.commit("SET_USER", user);
}

export function unsetUser(context) {
  context.commit("UNSET_USER");
}

export default {
  setNotes,
  setNote,
  deleteNote,
  setUser,
  unsetUser
};
