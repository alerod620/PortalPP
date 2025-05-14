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
  console.log('Navegando a:', to.path);
  
  // 1. Verificar si la ruta es pública
  if (to.meta && to.meta.public) {
    console.log('Ruta pública, acceso permitido');
    return next();
  }

  // 2. Verificar autenticación
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuth = isAuthenticated();
  
  console.log('Requiere autenticación?', requiresAuth);
  console.log('Está autenticado?', isAuth);

  if (requiresAuth && !isAuth) {
    console.log('Redirigiendo a login - No autenticado');
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
    console.log('No se requieren permisos específicos, acceso permitido');
    return next();
  }

  // 4. Verificar permisos específicos
  try {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo') || '{}');
    console.log('Usuario actual:', usuario);
    
    if (!usuario || !usuario.Permisos) {
      console.error('No se encontraron permisos para el usuario');
      return next({ name: 'NoAutorizado' });
    }

    const permisoRequerido = to.meta.requiresPermission;
    console.log('Verificando permiso:', permisoRequerido);
    
    if (tienePermiso(permisoRequerido)) {
      console.log('Permiso concedido para:', permisoRequerido);
      return next();
    }

    console.log('Acceso denegado - Permiso requerido:', permisoRequerido);
    return next({ name: 'NoAutorizado' });

  } catch (error) {
    console.error('Error al verificar permisos:', error);
    return next({ name: 'NoAutorizado' });
  }
});

export default router;
