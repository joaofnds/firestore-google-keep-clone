import {
  setNote as setFirebaseNote,
  deleteNote as deleteFirebaseNote
} from "../firebase/notes";

import showNotification from "../common/showNotification";

export function setNotes(context, notes) {
  context.commit("SET_NOTES", notes);
}

export function mergeNotes(context, notes) {
  const stateNotes = context.state.notes;
  const user = context.state.user;
  if (user) {
    for (let noteID in stateNotes) {
      setFirebaseNote(user.uid, noteID, stateNotes[noteID]);
    }
  }
  setNotes(context, { ...stateNotes, ...notes });
}

export function setNote(context, { noteID, note }) {
  // Commit changes to state
  context.commit("ADD_NOTE", { noteID, note });

  // Set note to firestore
  const { user } = context.state;
  if (user) {
    const userID = user.uid;
    setFirebaseNote(userID, noteID, note)
      .then(() => showNotification("Note saved"))
      .catch(err => {
        showNotification("Failed to save note on Firestore");
        throw new Error("Failed to save note to firebase", err);
      });
  }
}

export function deleteNote(context, noteID) {
  const note = context.state.notes[noteID];

  // Commit changes to state
  context.commit("DELETE_NOTE", noteID);

  // Delete note from firestore
  const { user } = context.state;
  if (user) {
    const userID = user.uid;
    deleteFirebaseNote(userID, noteID)
      .then()
      .catch(err => {
        throw new Error("Failed to delete note", err);
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
