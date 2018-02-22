<template>
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <i class="material-icons">assignment</i>
      <span class="mdl-layout-title">Juaum Keep</span>
      <div class="mdl-layout-spacer"></div>
      <div v-if='user'>
        <div v-if='user.photoURL' class="userContainer">
          <span class="mdl-layout-title displayName">{{ user.displayName }}</span>
          <img id='userHeaderPhoto' :src="user.photoURL">
          <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for='userHeaderPhoto'>
            <li @click='signOut' class="mdl-menu__item">Sign Out</li>
          </ul>
        </div>
        <i v-else class="material-icons">account_circle</i>
      </div>
      <div v-else>
        <span class="mdl-layout-title displayName">Sign in</span>
        <label for="signInLabel" @click='signIn' class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect">
          <i id='signInButton' class="material-icons">exit_to_app</i>
        </label>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  computed: mapState(["user"]),
  methods: {
    signIn() {
      alert("todo");
    }
  }
};
</script>

<style>

</style>
