import Vue from "vue";
import "./plugins/fontawesome";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from 'axios';
import VueAxios from 'vue-axios';
import Multiselect from "vue-multiselect";
import './style/style.scss';
import Notifications from 'vue-notification';
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

Vue.component('date-picker', VuePersianDatetimePicker);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component("multiselect", Multiselect);
Vue.use(Notifications);

Vue.prototype.$api = function (endpoint) {
  return process.env.VUE_APP_API + endpoint;
};
Vue.prototype.$asestUrl = function (endpoint) {
  return process.env.VUE_APP_ASSEST_URL + endpoint;
};

// set auth token if presen
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}
Vue.prototype.setAuthorize = function () {
  return { Authorization: axios.defaults.headers.common["Authorization"] };
};
new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    this.$http.interceptors.response.use(
      function (response) {
        return response;
      },
      function (err) {
        if (!store.getters.isAuthenticated) {
          if (err.response.status === 401) {
            router.push("/401");
          }
          if (err.response.status === 403) {
            router.push("/403");
          }
        }
        return Promise.reject(err);
      }
    );
  }
}).$mount("#app");
