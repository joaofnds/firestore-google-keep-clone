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
import { signIn, signOut } from "./firebase/auth";
import { getAllNotes } from "./firebase/notes";
import showNotification from "./common/showNotification";

export default {
  name: "app",
  components: { Header, Main },

  methods: {
    ...mapActions(["mergeNotes", "setUser", "unsetUser"]),

    handleSignIn() {
      signIn()
        .then(({ user }) => {
          if (!user) throw new Error("No user");
          this.setUser(user);

          showNotification("Logged in!");

          getAllNotes(user.uid).then(querySnap => {
            const notes = this.getNotesFromQuerySnap(querySnap);
            this.mergeNotes(notes);
          });
        })
        .catch(err => {
          throw new Error(err);
        });
    },

    handleSignOut() {
      signOut()
        .then(() => {
          showNotification("Logged out!");
          this.unsetUser();
          this.setNotes({});
        })
        .catch(err => {
          throw new Error(err);
        });
    },

    getNotesFromQuerySnap(querySnap) {
      const notes = {};
      querySnap.forEach(doc => {
        notes[doc.id] = {
          id: doc.id,
          ...doc.data()
        };
      });
      return notes;
    }
  }
};
</script>

<style>

</style>
