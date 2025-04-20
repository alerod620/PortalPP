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
        <form @submit="handleSubmitEditar">
            <DxForm :ref="formEditarPerfil" :form-data.sync="infoPerfil" labelMode="floating">
                <DxGroupItem :col-count="4">
                    <DxItem data-field="Registro" editor-type="dxTextBox" :editor-options="{ readOnly: true }" />
                    <DxItem data-field="Plaza" editor-type="dxTextBox" :editor-options="{ readOnly: true }" />
                    <DxItem data-field="Partida" editor-type="dxTextBox" :editor-options="{ readOnly: true }" />
                    <DxItem data-field="CUI" editor-type="dxTextBox" :editor-options="{ readOnly: true }" />
                </DxGroupItem>
                <DxGroupItem :col-count="3">
                    <DxItem data-field="Nombre" editor-type="dxTextBox" :editor-options="{ readOnly: !editarPerfil }" :validationRules="[{ type: 'required', message: 'Debe ingresar un nombre para la cuenta.' } ]" />
                    <DxItem data-field="Apellido" editor-type="dxTextBox" :editor-options="{ readOnly: !editarPerfil }" :validationRules="[{ type: 'required', message: 'Debe ingresar un apellido para la cuenta.' } ]" />
                    <DxItem data-field="Telefono" editor-type="dxNumberBox" :editor-options="{ readOnly: !editarPerfil }" :validationRules="[{ type: 'required', message: 'Debe ingresar un número de teléfono para la cuenta.' } ]">
                        <DxLabel text="Teléfono" />
                    </DxItem>
                </DxGroupItem>
                <DxGroupItem>
                    <DxButtonItem :visible="!editarPerfil" :button-options="editarButton" horizontal-alignment="center" verical-alignment="center" />
                    <DxGroupItem :col-count="2">
                        <DxButtonItem :visible="editarPerfil" :button-options="guardarEditarButton" horizontal-alignment="center" verical-alignment="center" />
                        <DxButtonItem :visible="editarPerfil" :button-options="cancelarEditarButton" horizontal-alignment="center" verical-alignment="center" />
                    </DxGroupItem>
                </DxGroupItem>
            </DxForm>
        </form>
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

import axios from 'axios'

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
            editarPerfil: false, //Varible para habilitar los campos para editar la información de la cuenta
            infoTemporal: {}, //Variable para guardar la información de la cuenta, antes de editar

            usuarios: [],

            editarButton: {
                text: 'Editar',
                type: 'success',
                // icon: 'save',
                useSubmitBehavior: false,
                onClick: () => {
                    this.editarInfoCuenta()
                }
            },

            guardarEditarButton: {
                text: 'Guardar',
                type: 'success',
                // icon: 'save',
                useSubmitBehavior: true,
            },

            cancelarEditarButton: {
                text: 'Cancelar',
                type: 'danger',
                // icon: 'save',
                onClick: () => {
                    this.cancelarEdicionCuenta()
                }
            },
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
            localStorage.removeItem("authToken");
            localStorage.removeItem("cuenta");
            localStorage.removeItem("usuarioActivo");
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
        },

        editarInfoCuenta() {
            this.editarPerfil = true

            this.infoTemporal = {
                ...this.infoPerfil
            }
        },

        cancelarEdicionCuenta() {
            this.infoPerfil = {
                ...this.infoTemporal
            }

            this.editarPerfil = false
        },

        async handleSubmitEditar(e) {
            e.preventDefault()
            console.log('Guardar')

            await axios.post('http://localhost:3000/api/Cuentas', {
                    Opcion: 6,
                    CUI: this.infoTemporal.CUI,
                    Nombre: this.infoPerfil.Nombre,
                    Apellido: this.infoPerfil.Apellido,
                    Telefono: this.infoPerfil.Telefono
                })
                .then(resp => {
                    console.log(resp)
                    if (resp.data.codigo == 0) {
                        this.editarPerfil = false
                        this.$vs.dialog({
                            type: 'alert',
                            color: '#ed8c72',
                            title: 'Cuenta actualizada',
                            acceptText: 'Aceptar',
                            text: 'Información actualizada con éxito',
                            buttonCancel: 'border',
                            accept: () => {},
                        })
                    }
                })
        },
    },
    beforeMount() {
        this.cargarInfoCuenta()
    }
};
</script>

<style></style>
