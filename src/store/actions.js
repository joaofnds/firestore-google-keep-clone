export default {
  addNote(context, note) {
    context.commit("ADD_NOTE", note);
  },

  deleteNote(context, index) {
    context.commit("DELETE_NOTE", index);
  },

  editNote(context, { index, note }) {
    context.commit("EDIT_NOTE", { index, note });
  },

  setUser(context, user) {
    context.commit("SET_USER", user);
  },

  unsetUser(context) {
    context.commit("UNSET_USER");
  }
};
