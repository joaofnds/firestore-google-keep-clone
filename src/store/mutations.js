export default {
  SET_NOTES(state, notes) {
    state.notes = notes;
  },

  ADD_NOTE(state, { noteID, note }) {
    state.notes = {
      ...state.notes,
      [noteID]: note
    };
  },

  DELETE_NOTE(state, noteID) {
    const notes = { ...state.notes };
    delete notes[noteID];
    state.notes = notes;
  },

  EDIT_NOTE(state, { noteID, note }) {
    state.notes[noteID] = note;
  },

  SET_USER(state, user) {
    state.user = user;
  },

  UNSET_USER(state) {
    state.user = null;
  }
};
