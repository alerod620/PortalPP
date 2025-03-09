<template>
<div class="full-screen">
    <vs-row class="h-full">
        <vs-col vs-justify="center" vs-align="center" class="w-full">
            <vs-row class="Formulario">
                <vs-col class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 formulario">
                    <form @submit="handleSubmit">
                        <div v-if="verInicioSesion" class="form-container">
                            <DxForm :form-data.sync="loginUsuario" labelMode="floating" labelLocation="top">
                                <DxGroupItem item-type="group">
                                    <DxItem data-field="CUI" editor-type="dxTextBox" />
                                    <DxItem data-field="Contraseña" editor-type="dxTextBox" :editor-options="{ mode:'password' }" />
                                </DxGroupItem>

                                <DxButtonItem :button-options="loginButtonOptions" horizontal-alignment="center" verical-alignment="center" />
                            </DxForm>
                            <!-- <div class="mt-4" style="display: flex; justify-content: center;">
                                <vs-button class="buttonInicioSesion" color="success" type="filled">
                                    <span>Iniciar sesión</span>
                                </vs-button>
                            </div> -->
                            <div class="mt-4" style="display: flex; justify-content: center;">
                                <vs-button type="line" @click="() => { recuperarContraseña = true }">
                                    <span>Olvidé mi contraseña</span>
                                </vs-button>
                            </div>
                            <vs-divider />
                            <div class="mt-4" style="display: flex; justify-content: center;">
                                <span>¿Aún no tienes usuario?</span>
                            </div>
                            <div class="mt-4" style="display: flex; justify-content: center;">
                                <vs-button type="line" @click="cambiarVista()">
                                    <span>Registrate</span>
                                </vs-button>
                            </div>
                        </div>
                        <div v-if="!verInicioSesion" class="form-container">
                            <DxForm :ref="formSolicitud" :form-data.sync="registroUsuario" labelMode="floating" labelLocation="top">
                                <DxGroupItem item-type="group">
                                    <DxItem data-field="Nombre" editor-type="dxTextBox" :validationRules="[{ type: 'required' }]" />
                                    <DxItem data-field="Apellido" editor-type="dxTextBox" :validationRules="[{ type: 'required' }]" />
                                    <DxItem data-field="Registro" editor-type="dxTextBox" :editor-options="{ inputMode: 'numeric', minLength: 1 }" :validationRules="[{ type: 'required' }, { type: 'pattern', pattern: '^[0-9]+$', message: 'El registro debe ser numérico.' }]" />
                                    <DxItem data-field="Correo" editor-type="dxTextBox" :validationRules="[{ type: 'required' }, { type: 'email', message: 'Correo no válido.' }]" />
                                    <DxItem data-field="Telefono" editor-type="dxTextBox" :editor-options="{ mask: '0000 0000', maskChar: '_', inputMode: 'numeric', maxLength: 8, minLength: 8 }" :validationRules="[{ type: 'required' }, { type: 'custom', validationCallback: validarTelefonoCelular, message: 'El número de celular debe iniciar con 3, 4 o 5 y tener 8 dígitos' }]">
                                        <DxLabel text="Celular" />
                                    </DxItem>
                                    <DxItem data-field="DPI" editor-type="dxTextBox" :editor-options="{ mask: '0000 00000 0000', maskChar: '_', inputMode: 'numeric' }" :validationRules="[{ type: 'required', message: 'El CUI es obligatorio.' }, { type: 'custom', validationCallback: validarDPI, message: 'El DPI no es válido.' }]" />
                                    <!-- <DxItem data-field="Contraseña" editor-type="dxTextBox" :editor-options="{ mode:'password' }" /> -->
                                </DxGroupItem>

                                <DxButtonItem :button-options="solicitudButtonOptions" horizontal-alignment="center" verical-alignment="center" />
                            </DxForm>
                            <!-- <div class="mt-4" style="display: flex; justify-content: center;">
                            <vs-button class="buttonInicioSesion" color="success" type="filled" @click="crearSolicitud()">
                                <span>Solicitar cuenta</span>
                            </vs-button>
                        </div> -->
                            <vs-divider />
                            <div class="mt-4" style="display: flex; justify-content: center;">
                                <span>¿Ya estás registrado?</span>
                            </div>
                            <div class="mt-4" style="display: flex; justify-content: center;">
                                <vs-button type="line" @click="cambiarVista()">
                                    <span>Inicia sesión</span>
                                </vs-button>
                            </div>
                        </div>
                    </form>
                </vs-col>
            </vs-row>
        </vs-col>
    </vs-row>

    <DxPopup width="auto" height="auto" :show-title="false" :drag-enabled="false" :hide-on-outside-click="false" :show-close-button="false" :visible="recuperarContraseña">
        <template #content>
            <div>
                <div class="imagenLogo mb-2">
                    <!-- <img :src="require('@/assets/images/CitasWeb/Logo.png')" width="300"> -->
                </div>
                <div class="mensajeRecuperarContraseña">
                    <span>
                        Para reestablecer tu contraseña, ingresa el correo electrónico con el que creaste tu cuenta.<br><br>
                        Te enviaremos instrucciones para restablecer tu contraseña.
                    </span>
                </div>
                <div class="mt-4" style="display:grid; align-items: center; justify-content:center;">
                    <DxForm :form-data.sync="recuperarCuenta" labelMode="outside" labelLocation="top">
                        <DxGroupItem item-type="group">
                            <DxItem data-field="Correo" editor-type="dxTextBox" />
                        </DxGroupItem>
                    </DxForm>
                </div>
                <div class="mt-4" style="display: flex; justify-content: center;">
                    <vs-button color="success" type="filled" style="width: 250px; size: 20px" @click="mensajeAceptar">
                        <span>Aceptar</span>
                    </vs-button>
                </div>
            </div>
        </template>
    </DxPopup>
</div>
</template>

<script>
import {
    DxForm,
    DxItem,
    DxGroupItem,
    DxLabel,
    DxButtonItem
} from 'devextreme-vue/form';
import DxPopup from 'devextreme-vue/popup';

import {
    validarDPI,
    validarTelefonoCelular
} from './data'

import axios from 'axios'


const formSolicitud = 'formSolicitud'

export default {
    name: 'Login',
    components: {
        DxForm,
        DxItem,
        DxGroupItem,
        DxLabel,
        DxPopup,
        DxButtonItem
    },
    data() {
        return {
            formSolicitud,
            
            loginUsuario: {},
            registroUsuario: {},
            recordarUsuario: false,
            recuperarContraseña: false,
            recuperarCuenta: {},
            verInicioSesion: true,

            solicitudButtonOptions: {
                text: 'Solicitar cuenta',
                type: 'success',
                // icon: 'save',
                useSubmitBehavior: true,
            },

            loginButtonOptions: {
                text: 'Iniciar sesión',
                type: 'success',
                // icon: 'save',
                useSubmitBehavior: true,
            },
        };
    },
    methods: {
        validarDPI,
        validarTelefonoCelular,
        mensajeAceptar() {
            this.recuperarContraseña = false;
        },

        cambiarVista() {
            this.verInicioSesion = !this.verInicioSesion
        },

        handleSubmit(e) {
            e.preventDefault()

            //Validación para definir qué acción debe hacer cuando de click al botón del formulario
            if (this.verInicioSesion) {
                this.login()
            } else {
                this.verificarCUI()
                // this.crearSolicitud()
            }
        },

        async verificarCUI()
        {
            await axios.post('http://localhost:3000/api/Cuentas', {
                    Opcion: 5,
                    CUI: this.registroUsuario.DPI,
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.$vs.dialog({
                            type: 'alert',
                            color: '#ed8c72',
                            title: 'Cuenta existente',
                            acceptText: 'Aceptar',
                            text: 'Ya existe una cuenta existente con el CUI/DPI ingresado',
                            buttonCancel: 'border',
                            accept: () => {},
                        })
                    }
                    else{
                        this.crearSolicitud()
                    }
                })
        },

        crearSolicitud() {
            axios.post('http://localhost:3000/api/Solicitudes', {
                    Opcion: 2,
                    Nombre: this.registroUsuario.Nombre,
                    Apellido: this.registroUsuario.Apellido,
                    Correo: this.registroUsuario.Correo,
                    Telefono: this.registroUsuario.Telefono,
                    DPI: this.registroUsuario.DPI,
                    Registro: this.registroUsuario.Registro
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.formSolicitudInstance.resetValues()
                    }
                })
        },

        limpiarVariables()
        {
            this.registroUsuario.Nombre = null
            this.registroUsuario.Apellido = null
            this.registroUsuario.Correo = null
            this.registroUsuario.Telefono = null
            this.registroUsuario.DPI = null
            this.registroUsuario.Registro = null
        },

        login()
        {
            axios.post('http://localhost:3000/api/Login', {
                    CUI: this.loginUsuario.CUI,
                    Password: this.loginUsuario.Contraseña
                })
                .then(resp => {
                    if (!resp.data.error) {
                        console.log(resp.data)
                        localStorage.setItem("token", resp.data.token);
                        localStorage.setItem("usuarios", JSON.stringify(resp.data.data.Usuarios));
                    }
                    else{
                        this.$vs.dialog({
                            type: 'alert',
                            color: '#ed8c72',
                            title: 'Credeciales erroneas',
                            acceptText: 'Aceptar',
                            text: 'CUI o contraseña erróneos. Intentelo nuevamente',
                            buttonCancel: 'border',
                            accept: () => {},
                        })
                    }
                })
        }
    },
    computed: {
        formSolicitudInstance: function () {
            return this.$refs[formSolicitud].instance;
        },
    }
}
</script>

<style>
.full-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-container {
    width: 300px;
}

.buttonInicioSesion {
    border-radius: 20px !important;
    width: 200px;
    size: 20px;
}

.formulario {
    display: grid;
    place-items: center;
}

.mensajeRecuperarContraseña {
    display: grid;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.buttonLink {
    background: none !important;
    border: none;
    padding: 0 !important;
    font-family: arial, sans-serif;
    color: #069;
    text-decoration: underline;
    cursor: pointer;
}
</style>
