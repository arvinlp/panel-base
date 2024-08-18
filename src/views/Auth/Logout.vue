<template>
  <div></div>
</template>
<script>
export default {
  name: "Logout",

  beforeCreate() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    } else {
      this.$router.push({ name: "home" });
    }
  },
};
</script>
