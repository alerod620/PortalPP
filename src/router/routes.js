import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

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
      },
      {
        path: "solicitudes",
        name: "solicitudes",
        component: Solicitudes,
      },
      {
        path: "modulos",
        name: "modulos",
        component: Modulos,
      },
      {
        path: "permisos",
        name: "permisos",
        component: Permisos,
      },
      {
        path: "roles",
        name: "roles",
        component: Roles,
      },
      {
        path: "menu",
        name: "menu",
        component: Menu,
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
      },
      {
        path: "recibos",
        name: "recibos",
        component: Recibos,
      },
      {
        path: "declaracionbeneficiarios",
        name: "declaracionbeneficiarios",
        component: Declaracion,
      },
      {
        path: "inicio",
        name: "inicio",
        component: Inicio,
      },
      {
        path: "landing",
        name: "landing",
        component: Landing,
      },
      {
        path: "pagos",
        name: "pagos",
        component: Pagos,
      },
      {
        path: "descuentos",
        name: "descuentos",
        component: Descuentos,
      },
    ],
    // meta: { requiresAuth: true },
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;

// Rutas fuera del Dashboard (mantenidas automáticamente)
export const rutasPublicas = ["/", "/login"];
