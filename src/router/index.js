import Vue from "vue";
import VueRouter from "vue-router";
import PageNotFound from "../views/Error/404.vue";
import Error401 from "../views/Error/401.vue";
import Login from "../views/Auth/Login.vue";
import Logout from "../views/Auth/Logout.vue";
import store from "../store/index";
import Portal from "./portal";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: PageNotFound,
    beforeEnter: (to, from, next) => {
      next({ path: "/404" });
    }
  },
  {
    path: "/404",
    component: PageNotFound,
    meta: {
      title: "صفحه مدنظر یافت نشد - ****"
    }
  },
  {
    path: "/401",
    component: Error401,
    meta: {
      title: "دسترسی محدود شده است - ****"
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "**** - ورود به سیستم",
      guest: true
    },
    beforeEach: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next();
      } else {
        next({
          name: 'dashboard',
          query: { redirect: to.fullPath }
        });
      }
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
    meta: {
      title: "**** - خروج از سیستم"
    },
    beforeEach: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next();
      } else {
        next({
          path: "/",
          query: { redirect: to.fullPath }
        });
      }
    }
  },
  ...Portal
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      return next();
    }
  } else {
    next();
  }

  if (to.matched.some(record => record.meta.guestOnly)) {
    if (store.getters.isAuthenticated) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);
  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
});
export default router;
