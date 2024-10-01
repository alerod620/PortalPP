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
import Publicaciones from "@/pages/Publicaciones.vue";
import Publicacion from "@/pages/Publicacion.vue";
import Recibos from "@/pages/Recibos.vue";
import DeclaracionBeneficiarios from "@/pages/DeclaracionBeneficiarios.vue";
import Inicio from "@/pages/InicioAfiliado.vue";
import Landing from "@/pages/Landingpage.vue";

//para el manejo del modulo de certificaciones
import menuCertificaciones from "@/pages/moduloCertificaciones/menuCertificaciones.vue";


const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/menu",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile,
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "maps",
        component: Maps,
      },
      {
        path: "typography",
        name: "typography",
        component: Typography,
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList,
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
        component: DeclaracionBeneficiarios,
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
        path: "menuCertificaciones",
        name: "",
        component: menuCertificaciones,
      },
    ],
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
