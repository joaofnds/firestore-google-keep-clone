<template>
  <div id='noteEditObfuscator' :class="{ 'is-visible': editMode }" class="noteEditMode" @click='cancelUpdateNote($event)'>
    <button id='noteEditClose' @click='cancelUpdateNote($event)' class="cancelButton mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect">
      <i class="material-icons" >close</i>
    </button>
    <NoteForm ref='editForm' @newnote='updateNote'></NoteForm>
    <span class="hint">Click outside to cancel</span>
  </div>
</template>

<script>
import NoteForm from "./NoteForm";

export default {
  name: "NoteEdit",
  components: {
    NoteForm
  }
}
</script>

<style>

</style>
