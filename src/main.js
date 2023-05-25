import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify'
import './assets/font/font.css'

import uToast from "@/components/uToast.vue";
Vue.component("uToast", uToast);
//     type:success,error
Vue.prototype.$toast = function(type, txt, timer) {
  return this.$refs.ucom.toast(type, txt, timer);
}

// import basePage from "@/layout/BasePage.vue";
import uComponents from "@/components/uComponents.vue"
Vue.component("uComponents", uComponents);

import messageTip from "./components/MessageTip"
messageTip(Vue);
// import {initWallet  } from "./wallet/index";
// initWallet();


new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
