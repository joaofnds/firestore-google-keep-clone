<template>
  <form @submit.prevent="handleSubmit" id="createNoteForm" class="mdl-card mdl-shadow--2dp">
    <input class="noteTitle" type="text" v-model="title" name="title" placeholder="Title" required=""/>
    <textarea class="noteBody" v-model="body" name="body" placeholder="Take a note..." rows="1" required="" ref="textArea"></textarea>
    <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--grey-800" id="submitButton">Done</button>
  </form>
</template>

<script>
import { guid } from "../common/guid";

export default {
  props: ["noteID", "note"],

  data() {
    return {
      id: "",
      title: "",
      body: ""
    };
  },

  mounted() {
    this.resize(this.$refs.textArea);
    this.id = guid();
  },

  watch: {
    body: function() {
      this.resize(this.$refs.textArea);
    },

    noteID: function() {
      this.id = this.noteID;
    },

    note: function(note) {
      if (note) {
        this.title = this.note.title;
        this.body = this.note.body;
      } else {
        this.resetFields();
      }
    }
  },

  methods: {
    handleSubmit: function() {
      this.$emit("submit", {
        noteID: this.id,
        note: {
          title: this.title.trim(),
          body: this.body.trim()
        }
      });
      this.resetFields();
    },

    resetFields() {
      this.id = guid();
      this.title = this.body = "";
    },

    resize: function(t) {
      var offset = !window.opera
        ? t.offsetHeight - t.clientHeight
        : t.offsetHeight +
          parseInt(
            window
              .getComputedStyle(t, null)
              .getPropertyValue("border-top-width")
          );
      t.style.height = "auto";
      t.style.height = t.scrollHeight + offset + "px";
    }
  }
};
</script>

<style>
form {
  min-height: initial !important;
  min-width: initial !important;
  width: auto !important;
  margin: 16px auto;
  max-width: 512px;
  font-weight: 600;
}
form .noteTitle {
  outline: none !important;
  border: none !important;
  padding: 10px 15px;
  font-weight: bold;
  font-size: 17px;
  font-family: "Roboto Condensed", arial, sans-serif;
}
form .noteBody {
  outline: none !important;
  border: none !important;
  padding: 15px;
  resize: none;
  font-size: 14px;
  font-family: "Roboto Slab", "Times New Roman", serif;
}
form #submitButton {
  width: 80px;
  margin: 10px 15px;
  margin-top: 0px;
  margin-left: auto;
}
</style>