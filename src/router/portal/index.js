// import Vue from "vue";
// import VueRouter from "vue-router";
// import store from "../store/index";

import Users from "./users";
import Home from "@/views/Home.vue";
import Body from "@/components/Body";

export default [
    {
      path: "",
      component: Body,
      children: [
        {
          path: "/",
          name: "home",
          component: Home,
          meta: {
            title: "داشبورد - ****"
          }
        },
        ...Users
      ],
    },
];