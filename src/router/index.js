import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active",
});

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
  // Implementa la lógica de autenticación, por ejemplo, verificar un token en localStorage
  return !!localStorage.getItem("authToken");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated()) {
    next({ name: "Login", query: { redirect: to.fullPath } }); // Guarda la ruta de origen
  } else {
    next();
  }
});

export default router;
