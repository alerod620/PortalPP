<template>
<nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
        <!-- <p class="navbar-brand">{{ routeName }}</p> -->
        <button class="navbar-toggler navbar-burger" type="button" @click="toggleSidebar" :aria-expanded="$sidebar.showSidebar" aria-label="Toggle navigation">
            <span class="navbar-toggler-bar"></span>
            <span class="navbar-toggler-bar"></span>
            <span class="navbar-toggler-bar"></span>
        </button>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
                <!-- <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-panel"></i>
              <p>Stats</p>
            </a>
          </li> -->
                <drop-down class="nav-item" title="OPCIONES" title-classes="nav-link" icon="gear">
                    <a class="dropdown-item" @click="popupVisible = true">Editar perfil</a>
                    <a class="dropdown-item" v-if="usuarios.length > 1" @click="popupUsuarios = true">Cambiar usuario</a>
                    <a class="dropdown-item" @click="cerrarSesion">Cerrar sesión</a>
                </drop-down>
                <!-- <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-settings"></i>
              <p>Settings</p>
            </a>
          </li> -->
            </ul>
        </div>
    </div>
    <DxPopup :show-title="true" height="auto" :visible.sync="popupVisible" title="Editar perfil" :show-close-button="true">
        <DxForm :ref="formEditarPerfil" :form-data.sync="infoPerfil" labelMode="floating">
            <DxGroupItem :col-count="4">
                <DxItem data-field="Registro" editor-type="dxTextBox" :editor-options="{ readOnly: true }" />
                <DxItem data-field="Plaza" editor-type="dxTextBox" :editor-options="{ readOnly: true }" />
                <DxItem data-field="Partida" editor-type="dxTextBox" :editor-options="{ readOnly: true }" />
                <DxItem data-field="CUI" editor-type="dxTextBox" :editor-options="{ readOnly: true }" />
            </DxGroupItem>
            <DxGroupItem :col-count="3">
                <DxItem data-field="Nombre" editor-type="dxTextBox" :editor-options="{ readOnly: true }" />
                <DxItem data-field="Apellido" editor-type="dxTextBox" :editor-options="{ readOnly: true }" />
                <DxItem data-field="Telefono" editor-type="dxTextBox" :editor-options="{ readOnly: true }">
                    <DxLabel text="Teléfono" />
                </DxItem>
            </DxGroupItem>

            <!-- <DxButtonItem :button-options="solicitudButtonOptions" horizontal-alignment="center" verical-alignment="center" /> -->
        </DxForm>
    </DxPopup>
    <DxPopup :show-title="true" height="auto" :visible.sync="popupUsuarios" title="Cambiar de usuario" :show-close-button="true">
        <SeleccionarUsuario :usuarios="usuarios" @usuarioSeleccinado="cargarInfoCuenta" />
    </DxPopup>
</nav>
</template>

<script>
import SeleccionarUsuario from '../../pages/SeleccionarUsuario.vue';
import DxPopup from 'devextreme-vue/popup';
import {
    DxForm,
    DxItem,
    DxGroupItem,
    DxLabel,
    DxButtonItem
} from 'devextreme-vue/form';
const formEditarPerfil = 'formEditarPerfil'

export default {
    components: {
        DxPopup,
        DxForm,
        DxItem,
        DxGroupItem,
        DxLabel,
        DxButtonItem,
        SeleccionarUsuario
    },
    computed: {
        routeName() {
            const {
                name
            } = this.$route;
            return this.capitalizeFirstLetter(name);
        },

        formEditarInstance: function () {
            return this.$refs[formEditarPerfil].instance;
        },
    },
    data() {
        return {
            activeNotifications: false,

            formEditarPerfil,
            popupVisible: false,
            infoPerfil: {},
            popupUsuarios: false,

            usuarios: []
        };
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        toggleNotificationDropDown() {
            this.activeNotifications = !this.activeNotifications;
        },
        closeDropDown() {
            this.activeNotifications = false;
        },
        toggleSidebar() {
            this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
        },
        hideSidebar() {
            this.$sidebar.displaySidebar(false);
        },

        cerrarSesion() {
            const redirectPath = this.$route.query.redirect || "/";
            this.$router.push(redirectPath);
        },

        cargarInfoCuenta() {
            this.popupUsuarios = false
            let infoCuenta = JSON.parse(localStorage.getItem("cuenta"))
            let infoUsuario = JSON.parse(localStorage.getItem("usuarioActivo"))
            if (infoCuenta) {
                this.usuarios = infoCuenta.Usuarios
                this.infoPerfil = {
                    ...infoCuenta,
                    Plaza: infoUsuario.Plaza,
                    Registro: infoUsuario.Registro,
                    Partida: infoUsuario.Partida
                }
            } else {
                this.infoPerfil = {}
            }
        }
    },
    beforeMount() {
        this.cargarInfoCuenta()
    }
};
</script>

<style></style>
