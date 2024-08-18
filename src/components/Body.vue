<template>
  <div>
    <Menu />
    <div class="main-content">
      <SideMenu />
      <b-container fluid class="content-body">
        <router-view />
      </b-container>
    </div>
  </div>
</template>

<script>
import Menu from "./Menu";
import SideMenu from "./SideMenu";
export default {
  components: {
    Menu,
    SideMenu,
  },
  beforeCreate() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push({ name: "login", query: { redirect: "/" } });
    } else {
      if (this.$store.getters.expiresIn < new Date().getTime()) {
        this.$router.push({ name: "login", query: { redirect: "/" } });
      }
    }
  },
  methods: {
    getRefresh() {
      let promise = this.$http.post(this.$api("refresh"));
      promise
        .then((response) => {
          return response;
        })
        .catch((error) => {
          this.$router.push({ name: "login", query: { redirect: "/" } });
          return error;
        });
    },
  },
};
</script>
