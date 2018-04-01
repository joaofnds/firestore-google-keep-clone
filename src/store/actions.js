import showNotification from "../common/showNotification";

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
}

export function deleteNote(context, noteID) {
  const { notes: { [noteID]: note } } = context.state;

  // Commit changes to state
  context.commit("DELETE_NOTE", noteID);

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
