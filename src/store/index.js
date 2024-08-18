import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: !!localStorage.getItem("token"),
    expires_in: localStorage.getItem("expires_in"),
    user: JSON.parse(localStorage.getItem("user")),
  },

  getters: {
    expiresIn(state) {
      return state.expires_in;
    },
    isAuthenticated(state) {
      var flag = false;
      if (state.isAuthenticated){
        if (state.user.status > 0) {
          flag = true;
        }
      }
      return flag;
    },
    getUser(state) {
      if (state.user.status > 0) {
        return state.user
      }
      return null;
    },
  },

  mutations: {
    authenticate(state, payload) {
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(payload.info));
      localStorage.setItem("token", payload.access_token);
      localStorage.setItem("expires_in", parseInt(payload.expires_time));
      Vue.set(state, 'expires_in', parseInt(payload.expires_time));
      Vue.set(state, 'token', payload.access_token);
      Vue.set(state, 'user', JSON.stringify(payload.info));
      console.error(payload);
    },

    updateUser(state, payload) {
      localStorage.setItem("expires_in", parseInt(payload.expires_time));
      localStorage.setItem("token", payload.access_token);
      localStorage.setItem("user", JSON.stringify(payload.info));
    },

    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("expires_in");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  actions: {
    login(context, payload) {
      context.commit("authenticate", payload);
    },

    updateUser(context, payload) {
      context.commit("updateUser", payload);
    },

    logout(context) {
      context.commit("logout");
    },

  }
});
