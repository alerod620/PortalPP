import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { tienePermiso, rutasPublicas } from "./routes";
Vue.use(VueRouter);

// Configuración del router
const router = new VueRouter({
  routes,
  linkActiveClass: "active",
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
  return !!localStorage.getItem("authToken");
}

// Guardián de navegación global
router.beforeEach((to, from, next) => {
  
  // 1. Verificar si la ruta es pública
  if (to.meta && to.meta.public) {
    return next();
  }

  // 2. Verificar autenticación
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuth = isAuthenticated();

  if (requiresAuth && !isAuth) {
    return next({ 
      name: "Login", 
      query: { 
        redirect: to.fullPath,
        error: 'auth-required'
      } 
    });
  }

  // 3. Si la ruta no requiere permisos específicos, permitir acceso
  if (!to.meta.requiresPermission) {
    return next();
  }

  // 4. Verificar permisos específicos
  try {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo') || '{}');
    
    if (!usuario || !usuario.Permisos) {
      return next({ name: 'NoAutorizado' });
    }

    const permisoRequerido = to.meta.requiresPermission;
    
    if (tienePermiso(permisoRequerido)) {
      return next();
    }
    return next({ name: 'NoAutorizado' });

  } catch (error) {
    return next({ name: 'NoAutorizado' });
  }
});

export default router;
