export default {
  ADD_NOTE(state, note) {
    state.notes.push(note);
  },

  DELETE_NOTE(state, index) {
    state.notes.splice(index, 1);
  },

  EDIT_NOTE(state, { index, note }) {
    state.notes[index] = note;
  },

  SET_USER(state, user) {
    state.user = user;
  },

  UNSET_USER(state) {
    state.user = null;
  }
};
