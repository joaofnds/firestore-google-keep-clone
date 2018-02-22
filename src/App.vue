<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button mdl-layout--no-desktop-drawer-button">
    <Header />
    <Main />
    <div id="snackbar" class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button class="mdl-snackbar__action" type="button"></button>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Main from "./components/Main";

export default {
  name: "app",
  components: { Header, Main }
};
</script>

<style>
</style>
