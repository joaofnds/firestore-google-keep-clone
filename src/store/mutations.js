export default {
  ADD_NOTE(state, note) {
    state.notes.push(note);
  },

  REMOVE_NOTE(state, index) {
    state.notes.splice(index, 1);
  },

  EDIT_NOTE(state, { index, note }) {
    state.notes[index] = note;
  }
};
