import {
  setNote as setFirebaseNote,
  deleteNote as deleteFirebaseNote
} from "../firebase/notes";

export default {
  setNotes(context, notes) {
    context.commit("SET_NOTES", notes);
  },

  setNote(context, { noteID, note }) {
    const userID = context.state.user.uid;
    setFirebaseNote(userID, noteID, note)
      .then(() => {
        context.commit("ADD_NOTE", { noteID, note });
      })
      .catch(err => {
        throw new Error("Failed to save note to firebase", err);
      });
  },

  deleteNote(context, noteID) {
    const userID = context.state.user.uid;
    deleteFirebaseNote(userID, noteID)
      .then(() => {
        context.commit("DELETE_NOTE", noteID);
      })
      .catch(err => {
        throw new Error("Failed to delete note", err);
      });
  },

  setUser(context, user) {
    context.commit("SET_USER", user);
  },

  unsetUser(context) {
    context.commit("UNSET_USER");
  }
};
