<template>
  <div :class="{ 'is-visible': isVisible }" class="noteEditMode" @click='cancelUpdateNote($event)' data-should-cancel >
    <button id='noteEditClose' data-should-cancel class="cancelButton mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect">
      <i class="material-icons" data-should-cancel>close</i>
    </button>
    <NoteForm ref='editForm' :noteID='noteID' :note='note' @submit='updateNote'></NoteForm>
    <span class="hint" data-should-cancel>Click outside to cancel</span>
  </div>
</template>

<script>
import NoteForm from "./NoteForm";

export default {
  name: "NoteEdit",

  props: ["isVisible", "noteID", "note"],

  components: {
    NoteForm
  },

  methods: {
    updateNote({ noteID, note }) {
      this.$emit("update", { noteID, note });
      this.$emit("cancel");
    },

    cancelUpdateNote(e) {
      if (e.target.dataset.shouldCancel != undefined) {
        this.$emit("cancel", e);
      }
    }
  }
};
</script>

<style>
.noteEditMode {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  opacity: 0;
  cursor: pointer;
  pointer-events: none;
  padding: 6px 8px;
  background-color: rgba(229, 229, 229, 0.9);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
.noteEditMode .cancelButton {
  float: right;
  color: #212121;
}
.noteEditMode .noteBody {
  margin-bottom: 10px;
}
.noteEditMode form {
  transform: translateY(-110%);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
.noteEditMode.is-visible {
  opacity: 1;
  pointer-events: auto;
}
.noteEditMode.is-visible form {
  margin-top: 70px;
  transform: translate(0%);
}
.noteEditMode .hint {
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 20px 10px;
  font-size: 1.3em;
  color: #9e9e9e;
}
</style>
