import showNotification from "../common/showNotification";
import {
  setNote as setFirestoreNote,
  deleteNote as deleteFirestoreNote
} from "../firebase/notes";

export function setNotes(context, notes) {
  context.commit("SET_NOTES", notes);
}

export function mergeNotes(context, notes) {
  const { notes: stateNotes } = context.state;
  setNotes(context, { ...stateNotes, ...notes });
}

export function setNote(context, { noteID, note }) {
  // Commit changes to state
  context.commit("ADD_NOTE", { noteID, note });

  // Set note to firestore
  const { user } = context.state;
  if (user) {
    setFirestoreNote(user.uid, noteID, note)
      .then(() => showNotification("Note saved"))
      .catch(err => {
        showNotification("Failed to save note to Firestore");
        throw new Error("Failed to save note to Firestore", err);
      });
  }
}

export function deleteNote(context, noteID) {
  const { notes: { [noteID]: note } } = context.state;

  // Commit changes to state
  context.commit("DELETE_NOTE", noteID);

  // Delete note from firestore
  const { user } = context.state;
  if (user) {
    deleteFirestoreNote(user.uid, noteID)
      .then()
      .catch(err => {
        showNotification("Failed to delete note from Firestore");
        throw new Error("Failed to delete note from Firestore", err);
      });
  }

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
  mergeNotes,
  setNote,
  deleteNote,
  setUser,
  unsetUser
};
