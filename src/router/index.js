import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { useUserStore } from "@/store/user";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/course",
    name: "Course",
    component: () =>
      import(/* webpackChunkName: "course" */ "../views/Course.vue"),
  },
  
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },


 {
    path: "/cart",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "cart" */ "../views/Cart.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;