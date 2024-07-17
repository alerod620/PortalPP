import Vue from "vue";
import VueRouter from "vue-router";

import Vuesax from 'vuesax'

import routes from "./routes";

import 'vuesax/dist/vuesax.css'

Vue.use(VueRouter);
Vue.use(Vuesax)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active",
});

export default router;
