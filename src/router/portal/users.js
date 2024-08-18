// import Vue from "vue";
// import VueRouter from "vue-router";
// import store from "../store/index";

import Empty from "@/components/Empty.vue";
import List from "@/views/Portal/Users/List";
import Form from "@/views/Portal/Users/Form";
import RoleList from "@/views/Portal/Roles/List";
import RoleForm from "@/views/Portal/Roles/Form";
import AdminList from "@/views/Portal/Admins/List";
import AdminForm from "@/views/Portal/Admins/Form";
import ClientList from "@/views/Portal/Clients/List";
import ClientForm from "@/views/Portal/Clients/Form";

export default [
    {
        path: "/users",
        component: Empty,
        children: [
            {
                path: "",
                name: "users",
                component: List,
                meta: {
                    title: "لیست پرسنل - ****"
                },
            },
            {
                path: "new",
                name: "user-new",
                component: Form,
                meta: {
                    title: "افزودن کاربر جدید - ****"
                }
            },
            {
                path: "edit/:id",
                name: "user-edit",
                component: Form,
                meta: {
                    title: "ویرایش کاربر - ****"
                }
            },
            {
                path: "/roles",
                component: Empty,
                children: [
                    {
                        path: "",
                        name: "roles",
                        component: RoleList,
                        meta: {
                            title: "لیست سطوح دسترسی - ****"
                        },
                    },
                    {
                        path: "new",
                        name: "role-new",
                        component: RoleForm,
                        meta: {
                            title: "افزودن سطح دسترسی جدید - ****"
                        }
                    },
                    {
                        path: "edit/:id",
                        name: "role-edit",
                        component: RoleForm,
                        meta: {
                            title: "ویرایش سطخ دسترسی - ****"
                        }
                    },
                ]
            },
        ]
    },
    {
        path: "/admins",
        component: Empty,
        children: [
            {
                path: "",
                name: "admins",
                component: AdminList,
                meta: {
                    title: "لیست مدیران - ****"
                },
            },
            {
                path: "new",
                name: "admin-new",
                component: AdminForm,
                meta: {
                    title: "افزودن مدیر جدید - ****"
                }
            },
            {
                path: "edit/:id",
                name: "admin-edit",
                component: AdminForm,
                meta: {
                    title: "ویرایش مدیر - ****"
                }
            },
        ]
    },
    {
        path: "/clients",
        component: Empty,
        children: [
            {
                path: "",
                name: "clients",
                component: ClientList,
                meta: {
                    title: "لیست مشتریان - ****"
                },
            },
            {
                path: "new",
                name: "client-new",
                component: ClientForm,
                meta: {
                    title: "افزودن مشتری جدید - ****"
                }
            },
            {
                path: "edit/:id",
                name: "client-edit",
                component: ClientForm,
                meta: {
                    title: "ویرایش مشتری - ****"
                }
            },
        ]
    },
];