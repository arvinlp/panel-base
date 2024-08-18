<template>
  <div id="app" dir="rtl">
    <notifications group="left" position="bottom left" />
    <notifications group="right" position="bottom right" />
    <notifications group="top" position="top center" />
    <div class="base">
      <router-view></router-view>
    </div>
    <footer>
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="6">
            <div class="pksi right">
              <span>نسخه ۱.۰.۰ - آخرین بروزرسانی ۱۴۰۰/۰۲/۰۱</span>
            </div>
          </b-col>
          <b-col cols="12" md="6">
            <div class="pksi left">
              <a href="https://pksi.org.ir" title="Part Kavir Smart Ideas Corporation">
                ایده های هوشمند پارت کویر
              </a>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {},
};
</script>
