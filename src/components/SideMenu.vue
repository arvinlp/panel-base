<template>
  <div class="side-menu">
    <div class="menu-handler" v-on:click="showMenuClick()">
      <span>نمایش منو</span>
      <i><font-awesome-icon :icon="['fas', 'bars']" /></i>
    </div>
    <ul class="side-menu-ul" :class="showMenuClass">
      <li
        v-for="(item, index) in menu"
        v-bind:key="index"
        :class="item.class + showClass(item)"
      >
        <router-link v-if="item.url != undefined" :to="item.url" class="side-link">
          <i><font-awesome-icon :icon="item.icon" /></i>
          <span>{{ item.name }}</span>
        </router-link>
        <div
          v-if="item.children != undefined"
          class="side-dropdown"
          v-on:click="showDropDown(item)"
        >
          <i><font-awesome-icon :icon="item.icon" /></i>
          <span>{{ item.name }}</span>
        </div>
        <ul
          v-if="item.children != undefined"
          class="children"
          v-on:click="showDropDown(item)"
        >
          <li
            v-for="(child, childIndex) in item.children"
            v-bind:key="childIndex"
            :class="liClassChildren(child)"
          >
            <router-link v-if="child.url != undefined" :to="child.url" class="side-link">
              <i><font-awesome-icon :icon="child.icon" /></i>
              <span>{{ child.name }}</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          name: "داشبورد",
          url: { name: "home" },
          icon: ["fas", "home"],
          class: "side-item",
        },
        {
          separator: true,
          class: "separator",
        },
        {
          name: "کاربران",
          icon: ["fas", "home"],
          class: "dropdown",
          show: false,
          children: [
            {
              name: "مدیران",
              url: { name: "admins" },
              icon: ["fas", "users"],
              class: "side-item",
            },
            {
              name: "پرسنل",
              url: { name: "users" },
              icon: ["fas", "users"],
              class: "side-item",
            },
            {
              name: "مشتریان",
              url: { name: "clients" },
              icon: ["fas", "users"],
              class: "side-item",
            },
            {
              name: "سطوح کاربری",
              url: { name: "roles" },
              icon: ["fas", "users"],
              class: "side-item",
            },
          ],
        },
        {
          name: "تنظیمات پایه",
          icon: ["fas", "home"],
          class: "dropdown",
          show: false,
          children: [
            {
              name: "صفحه نخست",
              url: { name: "home" },
              icon: ["fas", "home"],
              class: "side-item",
            },
            {
              name: "کاربران",
              url: { name: "users" },
              icon: ["fas", "users"],
              class: "side-item",
            },
          ],
        },
        {
          separator: true,
          class: "separator",
        },
        {
          name: "تنظیمات پایه",
          icon: ["fas", "home"],
          class: "dropdown",
          show: false,
          children: [
            {
              name: "صفحه نخست",
              url: { name: "home" },
              icon: ["fas", "home"],
              class: "side-item",
            },
            {
              name: "کاربران",
              url: { name: "users" },
              icon: ["fas", "users"],
              class: "side-item",
            },
          ],
        },
        {
          name: "تنظیمات پایه",
          icon: ["fas", "home"],
          class: "dropdown",
          show: false,
          children: [
            {
              name: "صفحه نخست",
              url: { name: "home" },
              icon: ["fas", "home"],
              class: "side-item",
            },
            {
              name: "کاربران",
              url: { name: "users" },
              icon: ["fas", "users"],
              class: "side-item",
            },
          ],
        },
        {
          name: "تنظیمات پایه",
          icon: ["fas", "home"],
          class: "dropdown",
          show: false,
          children: [
            {
              name: "صفحه نخست",
              url: { name: "home" },
              icon: ["fas", "home"],
              class: "side-item",
            },
            {
              name: "کاربران",
              url: { name: "users" },
              icon: ["fas", "users"],
              class: "side-item",
            },
          ],
        },
        {
          name: "تنظیمات پایه",
          icon: ["fas", "home"],
          class: "dropdown",
          show: false,
          children: [
            {
              name: "صفحه نخست",
              url: { name: "home" },
              icon: ["fas", "home"],
              class: "side-item",
            },
            {
              name: "کاربران",
              url: { name: "users" },
              icon: ["fas", "users"],
              class: "side-item",
            },
          ],
        },
      ],
      showMenu: false,
      showMenuClass: '',
    };
  },
  // mounted() {
  //   this.checkRoute();
  // },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    showMenuClick() {
      this.showMenu = this.showMenu ? false : true;
      this.showMenuClass = this.showMenu ? ' show' : '';
    },
    checkRoute() {
      this.menu.forEach((element) => {
        if (element.children != undefined) {
          var current = element.children.find(
            (item) => item.url.name == this.$route.name
          );
          if (current != undefined) element.show = true;
        }
      });
    },
    liClass(type) {
      var newClass = "side-item";
      if (type.separator != undefined) {
        if (type.separator) {
          newClass = "separator";
        }
      }
      if (type.children != undefined) {
        if (type.children.length) {
          newClass = "dropdown";
          if (type.active) newClass += "active";
          else newClass = "dropdown";
        }
      }
      return newClass;
    },
    liClassChildren(type) {
      var newClass = "side-item";
      if (type.separator != undefined) {
        if (type.separator) {
          newClass = "separator";
        }
      }
      return newClass;
    },
    showDropDown(item) {
      if (item.children != undefined) {
        if (item.show != undefined) {
          if (item.show) item.show = false;
          else item.show = true;
        } else {
          item.show = true;
        }
      }
    },
    showClass(item) {
      var cl = "";
      if (item.show != undefined) {
        if (item.show) cl = " show";
        else cl = "";
      } else {
        if (item.children != undefined) {
          if (item.show) cl = " show";
          else cl = "";
        }
      }
      return cl;
    },
  },
};
</script>
