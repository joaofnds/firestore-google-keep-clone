import Vue from "vue";
import { auth } from "firebase";
import { getAllNotes } from "./firebase/notes";
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

    getAllNotes(user.uid)
      .then(querySnap => {
        const notes = getNotesFromQuerySnap(querySnap);
        dispatch("mergeNotes", notes);
      })
      .catch(err => {
        throw new Error(err);
      });
  } else {
    dispatch("unsetUser");
    dispatch("setNotes", {});
  }
});

function getNotesFromQuerySnap(querySnap) {
  const notes = {};

  querySnap.forEach(doc => {
    notes[doc.id] = {
      id: doc.id,
      ...doc.data()
    };
  });

  return notes;
}
