import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";
import NoAutorizado from "@/pages/NoAutorizado.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import Usuarios from "@/pages/Usuarios.vue";
import Solicitudes from "@/pages/Solicitudes.vue";
import Modulos from "@/pages/Modulos.vue";
import Menu from "@/pages/Menu.vue";
import Permisos from "@/pages/Permisos.vue";
import Roles from "@/pages/Roles.vue";
import Publicaciones from "@/pages/Publicaciones.vue";
import Publicacion from "@/pages/Publicacion.vue";
import Recibos from "@/pages/Recibos.vue";
import Nosotros from "@/pages/Nosotros.vue";
import Contactenos from "@/pages/Contactenos.vue";
import Login from "@/pages/Login.vue";
import Inicio from "@/pages/Inicio.vue";
// import DeclaracionBeneficiarios from "@/pages/DeclaracionBeneficiarios.vue";
import Declaracion from "@/pages/Declaracion.vue";
import InicioAfiliado from "@/pages/InicioAfiliado.vue";
import Landing from "@/pages/Landingpage.vue";
import Pagos from "@/pages/Pagos.vue";
import Descuentos from "@/pages/Descuentos.vue";

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Landing,
    children: [
      {
        path: "",
        name: "Inicio",
        component: Inicio,
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/nosotros",
        name: "Nosotros",
        component: Nosotros,
      },
      {
        path: "/contacto",
        name: "Contáctenos",
        component: Contactenos,
      },
      {
        path: "/circulares",
        name: "Publicaciones",
        component: Publicaciones,
      },
    ]
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true }, // Requiere autenticación
    children: [
      {
        path: "inicio",
        name: "inicio",
        component: InicioAfiliado,
      },
      {
        path: "usuarios",
        name: "usuarios",
        component: Usuarios,
        meta: { requiresPermission: 'VerUsuarios' }
      },
      {
        path: "solicitudes",
        name: "solicitudes",
        component: Solicitudes,
        meta: { requiresPermission: 'VerSolicitudes' }
      },
      {
        path: "modulos",
        name: "modulos",
        component: Modulos,
        meta: { requiresPermission: 'VerModulos' }
      },
      {
        path: "permisos",
        name: "permisos",
        component: Permisos,
        meta: { requiresPermission: 'VerPermisos' }
      },
      {
        path: "roles",
        name: "roles",
        component: Roles,
        meta: { requiresPermission: 'VerRoles' }
      },
      {
        path: "menu",
        name: "menu",
        component: Menu,
        meta: { requiresPermission: 'VerMenu' }
      },
      {
        path: "publicaciones",
        name: "publicaciones",
        component: Publicaciones,
      },
      {
        path: "publicacion",
        name: "publicacion",
        component: Publicacion,
        meta: { requiresPermission: 'VerPublicaciones' }
      },
      {
        path: "recibos",
        name: "recibos",
        component: Recibos,
        meta: { requiresPermission: 'ver_recibos' }
      },
      {
        path: "declaracionbeneficiarios",
        name: "declaracionbeneficiarios",
        component: Declaracion,
        meta: { requiresPermission: 'VerBeneficiarios' }
      },
      {
        path: "inicio",
        name: "inicio",
        component: Inicio,
      },
      {
        path: "pagos",
        name: "pagos",
        component: Pagos,
        meta: { requiresPermission: 'VerPagos' }
      },
      {
        path: "descuentos",
        name: "descuentos",
        component: Descuentos,
        meta: { requiresPermission: 'VerDescuentos' }
      },
    ],
  },
  { 
    path: "/no-autorizado",
    name: "NoAutorizado",
    component: NoAutorizado,
    meta: { public: true }
  },
];

// Función para verificar si el usuario tiene un permiso específico
export const tienePermiso = (permisoRequerido) => {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo') || '{}');
    
    // Si no hay usuario o no tiene permisos, devolver falso
    if (!usuario || !usuario.Permisos || !Array.isArray(usuario.Permisos)) {
      return false;
    }
    
    // Buscar si el usuario tiene el permiso requerido
    const tieneElPermiso = usuario.Permisos.some(permiso => 
      permiso.Nombre === permisoRequerido
    );
    
    return tieneElPermiso;
    
  } catch (error) {
    return false;
  }
};

// Rutas públicas (accesibles sin autenticación)
export const rutasPublicas = ["/", "/login", "/no-autorizado"];

export default routes;
