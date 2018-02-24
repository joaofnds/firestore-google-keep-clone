<template>
  <main class="mdl-layout__content">
    <NoteForm @submit='addNote'></NoteForm>
    <transition-group @leave='leave' tag='div' class='mdl-grid'>
      <Note v-for='(note, index) in notes'
          :noteindex='index'
          :notetitle='note.title'
          :notebody='note.body'
          :key='index'
          @delete='deleteNote'
          @edit='setEditMode'/>
    </transition-group>

    <NoteEdit
      :isVisible='editMode'
      :note='notes[editNoteIndex]'
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
      editMode: false,
      editNoteIndex: 0
    };
  },

  computed: {
    ...mapState({
      notes: state => state.notes
    })
  },

  methods: {
    ...mapActions(["addNote", "editNote", "deleteNote"]),

    setEditMode(index) {
      this.editNoteIndex = index;
      this.editMode = true;
    },

    handleEditNote(note) {
      this.editNote({ index: this.editNoteIndex, note });
      this.editNoteIndex = 0;
      this.editMode = false;
    },

    cancelEdit() {
      this.editMode = false;
      this.editNoteIndex = null;
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
