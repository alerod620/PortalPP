<template>
<div class="wrapper">
    <side-bar>
        <template slot="links">
            <!-- <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel" /> -->
            <!-- <sidebar-link to="/stats" name="User Profile" icon="ti-user" /> -->
            <!-- <sidebar-link to="/table-list" name="Table List" icon="ti-view-list-alt" />
              <sidebar-link to="/typography" name="Typography" icon="ti-text" />
              <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2" />
              <sidebar-link to="/maps" name="Map" icon="ti-map" />
              <sidebar-link to="/notifications" name="Notifications" icon="ti-bell" /> -->
            <!-- <font-awesome-icon :icon="['fas', 'file-prescription']" class="pr-2" style="font-size: 16px" /> -->

            <sidebar-link v-for="modulo in modulosDisponibles" :key="modulo.IdModulo" :to="getDashboardRoute(modulo.Ruta)" :name="modulo.Nombre" :icon="modulo.Icono" />

            <!-- <sidebar-link to="/menu" name="Menu" icon="bars" />
            <sidebar-link to="/usuarios" name="Usuarios" icon="users" />
            <sidebar-link to="/solicitudes" name="Solicitudes" icon="bell" />
            <sidebar-link to="/modulos" name="Módulos" icon="gears" />
            <sidebar-link to="/permisos" name="Permisos" icon="key" />
            <sidebar-link to="/roles" name="Roles" icon="user-gear" />
            <sidebar-link to="/publicaciones" name="Publicaciones" icon="newspaper" />
            <sidebar-link to="/recibos" name="Recibos" icon="check-square" />
            <sidebar-link to="/declaracionbeneficiarios" name="Beneficiarios" icon="child" />
            <sidebar-link to="/inicio" name="Inicio" icon="tachometer" />
            <sidebar-link to="/landing" name="Landing page" icon="home" /> -->
        </template>
        <!-- <mobile-menu>
            <li class="nav-item">
                <a class="nav-link">
                    <i class="ti-panel"></i>
                    <p>Stats</p>
                </a>
            </li>
            <drop-down class="nav-item" title="5 Notifications" title-classes="nav-link" icon="ti-bell">
                <a class="dropdown-item">Notification 1</a>
                <a class="dropdown-item">Notification 2</a>
                <a class="dropdown-item">Notification 3</a>
                <a class="dropdown-item">Notification 4</a>
                <a class="dropdown-item">Another notification</a>
            </drop-down>
            <li class="nav-item">
                <a class="nav-link">
                    <i class="ti-settings"></i>
                    <p>Settings</p>
                </a>
            </li>
            <li class="divider"></li>
        </mobile-menu> -->
    </side-bar>
    <div class="main-panel">
        <top-navbar></top-navbar>

        <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

        <content-footer></content-footer>
    </div>
</div>
</template>

<style lang="scss"></style>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
import {
    rutasPublicas
} from "../../router/routes";
export default {
    components: {
          TopNavbar,
        ContentFooter,
        DashboardContent,
        MobileMenu,
    },
    data() {
        return {
            rutasPublicas,
            modulosDisponibles: [],
            permisosDisponibles: [],
        };
    },
    methods: {
        toggleSidebar() {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.displaySidebar(false);
            }
        },
        loadModules() {
            let infoUsuario = localStorage.getItem("usuarioActivo")
            if (infoUsuario) {
                infoUsuario = JSON.parse(infoUsuario)
                this.modulosDisponibles = infoUsuario.Modulos
                this.permisosDisponibles = infoUsuario.Permisos
            } else {
                this.modulosDisponibles = []
                this.permisosDisponibles = []
            }
        },
        getDashboardRoute(ruta) {
            // Si la ruta es pública, la deja igual, si no, la anida bajo "/dashboard"
            return rutasPublicas.includes(ruta) ? ruta : `/dashboard${ruta}`;
        },
    },
    mounted() {
        this.loadModules()
    },
    computed: {}
};
</script>
