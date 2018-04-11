import Vue from "vue";
import { auth } from "firebase";
import { setSnapshotListener } from "./firebase/notes";
import showNotification from "./common/showNotification";

import "./firebase/main";

import App from "./App.vue";
import store from "./store/store";

Vue.config.productionTip = false;

const app = new Vue({
  render: h => h(App),
  store
}).$mount("#app");

// Set up auth change listener
auth().onAuthStateChanged(user => {
  const { dispatch } = app.$store;

  if (user) {
    dispatch("setUser", user);
    showNotification("Logged in!");

    setSnapshotListener(user.uid, (type, note) => {
      handleQuerySnapshot(dispatch, type, note);
    });
  } else {
    dispatch("unsetUser");
    dispatch("setNotes", {});
  }
});

function handleQuerySnapshot(dispatch, type, note) {
  switch (type) {
    case "modified":
    case "added":
      dispatch("setNote", {
        noteID: note.id,
        note: {
          title: note.title,
          body: note.body
        }
      });
      break;

    case "removed":
      dispatch("deleteNote", note.id);
      break;

    default:
      break;
  }
}
