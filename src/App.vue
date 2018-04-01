<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button mdl-layout--no-desktop-drawer-button">
    <Header @signIn='handleSignIn' @signOut='handleSignOut' />
    <Main />
    <div id="snackbar" class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button class="mdl-snackbar__action" type="button"></button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "./components/Header";
import Main from "./components/Main";
import showNotification from "./common/showNotification";

export default {
  name: "app",
  components: { Header, Main },

  methods: {
    ...mapActions(["mergeNotes", "setUser", "unsetUser"]),

    handleSignIn() {
      showNotification("Not implemented yet!");
    },

    handleSignOut() {
      showNotification("Not implemented yet!");
    },
  }
};
</script>

<style>

</style>
