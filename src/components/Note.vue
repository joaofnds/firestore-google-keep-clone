<template>
  <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--12-col-phone">
    <div class="row">
      <div class="title">{{noteTitle}}</div>
      <button :id="noteID" class="menu mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect">
        <i class="material-icons mdl-color-text--grey-700">more_vert</i>
      </button>
      <ul :for="noteID" class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect">
        <li @click="editNote" class="mdl-menu__item">Edit</li>
        <li @click="deleteNote" class="mdl-menu__item">Delete</li>
      </ul>
    </div>
    <div class="body">{{noteBody}}</div>
  </div>
</template>

<script>
export default {
  props: ["noteID", "noteTitle", "noteBody"],

  mounted() {
    this.$nextTick(() => {
      componentHandler.upgradeDom();
    });
  },

  methods: {
    deleteNote() {
      this.$emit("delete", this.noteID);
    },
    editNote() {
      this.$emit("edit", this.noteID);
    }
  }
};
</script>

<style>
.row {
  padding: 10px 15px;
  padding-bottom: 5px;
}
.row .title {
  display: inline-block;
  font-weight: bold;
  font-size: 17px;
  font-family: "Roboto Condensed", arial, sans-serif;
}
.row .menu {
  float: right;
}

.body {
  padding: 15px;
  padding-top: 5px;
  resize: none;
  font-size: 14px;
  font-family: "Roboto Slab", "Times New Roman", serif;
}
</style>