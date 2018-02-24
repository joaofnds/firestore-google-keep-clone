<template>
  <main class="mdl-layout__content">
    <NoteForm @newnote='createNote'></NoteForm>
    <transition-group @leave='leave' tag='div' class='mdl-grid'>
      <Note v-for='(note, index) in notes'
          :noteindex='index'
          :notetitle='note.title'
          :notebody='note.body'
          :key='index'
          @delete='deletenote'
          @edit='editNote'/>
    </transition-group>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Note from "./Note";
import NoteForm from "./NoteForm";

export default {
  name: "Main",

  components: { Note, NoteForm },

  computed: {
    ...mapState({
      notes: state => state.notes
    })
  },

  methods: {
    ...mapActions(['addNote']),

    createNote(note) {
      this.addNote(note)
    },

    leave() {
      alert("TODO");
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
