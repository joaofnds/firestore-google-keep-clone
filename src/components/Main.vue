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
import { mapState } from "vuex";
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
    createNote() {
      alert("TODO");
    },
    leave() {
      alert("TODO");
    }
  }
};
</script>

<style>

</style>
