import Vue from "vue";

import "./firebase/main";

import App from "./App.vue";
import store from "./store/store";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
