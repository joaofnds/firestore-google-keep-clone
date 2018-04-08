import {
  setNote as setFirestoreNote,
  deleteNote as deleteFirestoreNote
} from "../firebase/notes";
import showNotification from "../common/showNotification";

export default {
  setNotes(context, notes) {
    context.commit("SET_NOTES", notes);
  },

  mergeNotes(context, notes) {
    const { notes: stateNotes } = context.state;
    context.dispatch("setNotes", { ...stateNotes, ...notes });
  },

  setNote(context, { noteID, note }) {
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
  },

  deleteNote(context, noteID) {
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
      context.dispatch("setNote", { noteID, note });
    });
  },

  setUser(context, user) {
    context.commit("SET_USER", user);
  },

  unsetUser(context) {
    context.commit("UNSET_USER");
  }
};
