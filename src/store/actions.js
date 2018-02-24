export default {
  addNote(context, note) {
    context.commit("ADD_NOTE", note);
  },

  removeNote(context, index) {
    context.commit("REMOVE_NOTE", index);
  },

  editNote(context, { index, note }) {
    context.commit("EDIT_NOTE", { index, note });
  }
};
