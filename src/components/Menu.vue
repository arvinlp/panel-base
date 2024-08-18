<template>
  <div class="bg-pksi">
    <b-container fluid>
      <b-row>
        <b-col>
          <b-navbar class="top-bar" toggleable="md" type="dark">
            <b-navbar-brand :to="{name: 'home'}">پرتال</b-navbar-brand>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                <b-nav-item>{{ userInfo.nickname }}</b-nav-item>
                <b-nav-item :to="{ name: 'logout' }">خروج</b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  methods: {},
  computed: {
    userInfo: function () {
      return this.$store.getters.getUser;
    },
  },
};
</script>
