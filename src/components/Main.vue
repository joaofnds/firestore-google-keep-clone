<template>
  <main class="mdl-layout__content">
    <NoteForm @submit='setNote'></NoteForm>
    <transition-group @leave='leave' tag='div' class='mdl-grid'>
      <Note v-for='(note, noteID) in notes'
          :noteID='noteID'
          :noteTitle='note.title'
          :noteBody='note.body'
          :key='noteID'
          @delete='deleteNote'
          @edit='setEditing'/>
    </transition-group>

    <NoteEdit
      :isVisible='isEditing'
      :note='notes[editNoteID]'
      :noteID='editNoteID'
      @update='handleEditNote'
      @cancel='cancelEdit'
    />
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Note from "./Note";
import NoteForm from "./NoteForm";
import NoteEdit from "./NoteEdit";

export default {
  name: "Main",

  components: { Note, NoteForm, NoteEdit },

  data() {
    return {
      isEditing: false,
      editNoteID: 0
    };
  },

  computed: {
    ...mapState({
      notes: state => state.notes
    })
  },

  methods: {
    ...mapActions(["setNote", "deleteNote"]),

    setEditing(noteID) {
      this.editNoteID = noteID;
      this.isEditing = true;
    },

    handleEditNote({ noteID, note }) {
      this.setNote({ noteID, note });
      this.cancelEdit();
    },

    cancelEdit() {
      this.editNoteID = null;
      this.isEditing = false;
    },

    leave(el) {
      const top = `${el.offsetTop}px`;
      const left = `${el.offsetLeft}px`;
      const height = `${el.clientHeight}px`;
      const width = `${el.clientWidth}px`;
      el.style.transform = "scale(0)";
      el.style.position = "absolute";
      el.style.top = top;
      el.style.left = left;
      el.style.height = height;
      el.style.width = width;
      el.style.opacity = 0;
    }
  }
};
</script>

<style>
.mdl-grid {
  padding: 8px 0px;
}

.mdl-cell {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: 50% 50%;
  position: relative;
}

.v-enter-active {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}
</style>
