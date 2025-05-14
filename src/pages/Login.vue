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
                                    <DxItem data-field="CUI" editor-type="dxTextBox" :editor-options="{ mask: '0000 00000 0000', maskChar: '_', inputMode: 'numeric' }" :validationRules="[{ type: 'required', message: 'El CUI es obligatorio.' }, { type: 'custom', validationCallback: validarDPI, message: 'El DPI no es válido.' }]" />
                                    <DxItem data-field="Contraseña" editor-type="dxTextBox" :editor-options="{ mode:'password' }" :validationRules="[{ type: 'required', message: 'La contraseña es obligatoria.' }]" />
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
                                    <DxItem data-field="Correo" editor-type="dxTextBox" :validationRules="[{ type: 'required' }, { type: 'email', message: 'Correo no válido.' }]" />
                                    <DxItem data-field="Telefono" editor-type="dxTextBox" :editor-options="{ mask: '0000 0000', maskChar: '_', inputMode: 'numeric', maxLength: 8, minLength: 8 }" :validationRules="[{ type: 'required' }, { type: 'custom', validationCallback: validarTelefonoCelular, message: 'El número de celular debe iniciar con 3, 4 o 5 y tener 8 dígitos' }]">
                                        <DxLabel text="Celular" />
                                    </DxItem>
                                    <DxItem data-field="CUI" editor-type="dxTextBox" :editor-options="{ mask: '0000 00000 0000', maskChar: '_', inputMode: 'numeric' }" :validationRules="[{ type: 'required', message: 'El CUI es obligatorio.' }, { type: 'custom', validationCallback: validarDPI, message: 'El CUI no es válido.' }]" />
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

    <DxPopup width="auto" height="auto" :show-title="true" :drag-enabled="true" :hide-on-outside-click="true" :showCloseButton="true" title="Reestsablecer contraseña" :visible.sync="recuperarContraseña">
        <template #content>
            <form @submit="submitResstablecerPass">
                <div class="imagenLogo mb-2">
                    <!-- <img :src="require('@/assets/images/CitasWeb/Logo.png')" width="300"> -->
                </div>
                <div class="mensajeRecuperarContraseña">
                    <span>
                        Para reestablecer tu contraseña, ingresa tu número de CUI con el que está registrada tu cuenta.<br><br>
                        Te enviaremos un correo con una nueva contraseña para ingresar al sistema.
                    </span>
                </div>
                <div class="mt-4" style="display:grid; align-items: center; justify-content:center;">
                    <DxForm :form-data.sync="recuperarCuenta" labelMode="outside" labelLocation="top">
                        <DxGroupItem item-type="group">
                            <DxItem data-field="CUI" editor-type="dxTextBox" :editor-options="{ mask: '0000 00000 0000', maskChar: '_', inputMode: 'numeric' }" :validationRules="[{ type: 'required', message: 'El CUI es obligatorio.' }, { type: 'custom', validationCallback: validarDPI, message: 'El CUI no es válido.' }]" />
                            
                            <DxButtonItem :button-options="restablecerButtonOptions" horizontal-alignment="center" verical-alignment="center" />
                        </DxGroupItem>
                    </DxForm>
                </div>
            </form>
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
            recuperarCuenta: {
                CUI: null
            },
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

            restablecerButtonOptions: {
                text: 'Reestablecer',
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

        submitResstablecerPass(e) {
            e.preventDefault()

            this.reestablecerPassword()
        },

        //Método para verificar si ya existe una cuenta con el CUI ingresado al solicitar la creación de una cuenta
        async verificarCUI()
        {
            await axios.post('http://localhost:3000/api/Cuentas', {
                    Opcion: 5,
                    CUI: this.registroUsuario.CUI,
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.$vs.dialog({
                            type: 'alert',
                            color: '#ed8c72',
                            title: 'Cuenta existente',
                            acceptText: 'Aceptar',
                            text: 'Ya existe una cuenta existente con el CUI ingresado',
                            buttonCancel: 'border',
                            accept: () => {},
                        })
                    }
                    else{
                        this.crearSolicitud()
                    }
                })
        },

        //Método para verificar si ya existe una cuenta con el CUI ingresado al solicitar que se reestrablezca la cuenta
        async verificarCUIReestablecer()
        {
            await axios.post('http://localhost:3000/api/Cuentas', {
                    Opcion: 5,
                    CUI: this.registroUsuario.CUI,
                })
                .then(resp => {
                    if (resp.data.length == 0){
                        this.$vs.dialog({
                            type: 'alert',
                            color: '#ed8c72',
                            title: 'Cuenta no encontrada',
                            acceptText: 'Aceptar',
                            text: 'No existe una cuenta existente con el CUI ingresado',
                            buttonCancel: 'border',
                            accept: () => {},
                        })
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
                    CUI: this.registroUsuario.CUI,
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.formSolicitudInstance.resetValues()
                        this.$vs.dialog({
                            type: 'alert',
                            color: '#ed8c72',
                            title: 'Solicitud exitosa',
                            acceptText: 'Aceptar',
                            text: 'Su solicitud ha sido enviada con éxito',
                            buttonCancel: 'border',
                            accept: () => {},
                        })
                    }
                })
        },

        limpiarVariables()
        {
            this.registroUsuario.Nombre = null
            this.registroUsuario.Apellido = null
            this.registroUsuario.Correo = null
            this.registroUsuario.Telefono = null
            this.registroUsuario.CUI = null
        },

        login()
        {
            axios.post('http://localhost:3000/api/Login', {
                    CUI: this.loginUsuario.CUI,
                    Password: this.loginUsuario.Contraseña
                })
                .then(resp => {
                    if (!resp.data.error && !resp.error) {
                        localStorage.setItem("authToken", resp.data.token);
                        localStorage.setItem("cuenta", JSON.stringify(resp.data.data));
                        localStorage.setItem("usuarioActivo", JSON.stringify(resp.data.data.Roles[0]));

                        const redirectPath = this.$route.query.redirect || "/dashboard/inicio";
                        this.$router.push(redirectPath);
                    }
                    else{
                        this.$vs.dialog({
                            type: 'alert',
                            color: '#ed8c72',
                            title: 'Credeciales erróneas',
                            acceptText: 'Aceptar',
                            text: 'CUI o contraseña erróneos. Intentelo nuevamente',
                            buttonCancel: 'border',
                            accept: () => {},
                        })
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        this.$vs.dialog({
                            type: 'alert',
                            color: '#ed8c72',
                            title: 'Credenciales erróneas',
                            acceptText: 'Aceptar',
                            text: error.response.data.error || 'CUI o contraseña erróneos. Inténtelo nuevamente',
                            buttonCancel: 'border',
                            accept: () => {},
                        });
                    } else {
                        this.$vs.dialog({
                            type: 'alert',
                            color: 'danger',
                            title: 'Error de servidor',
                            acceptText: 'Aceptar',
                            text: 'Ocurrió un error inesperado. Por favor, intente más tarde.',
                            buttonCancel: 'border',
                            accept: () => {},
                        });
                    }       
                })
        },

        reestablecerPassword()
        {
            axios.post('http://localhost:3000/api/ReestablecerPassword', {
                    CUI: this.recuperarCuenta.CUI
                })
                .then(resp => {
                    if (!resp.data.error) {
                        this.recuperarContraseña = false
                        this.recuperarCuenta.CUI = null
                        this.$vs.dialog({
                            type: 'alert',
                            color: '#ed8c72',
                            title: 'Credeciales modificadas',
                            acceptText: 'Aceptar',
                            text: 'Se ha enviado un correo con sus nuevas credenciales.',
                            buttonCancel: 'border',
                            accept: () => {},
                        })
                    }
                    else{
                        this.$vs.dialog({
                            type: 'alert',
                            color: '#ed8c72',
                            title: 'Cuenta no existente',
                            acceptText: 'Aceptar',
                            text: 'No existe ninguna cuenta con el CUI ingresado',
                            buttonCancel: 'border',
                            accept: () => {},
                        })
                    }
                })
                .catch(error => {
                        if(error.code == 401)
                        {
                            this.$vs.dialog({
                                type: 'alert',
                                color: '#ed8c72',
                                title: 'Cuenta no existente',
                                acceptText: 'Aceptar',
                                text: 'No existe ninguna cuenta con el CUI ingresado',
                                buttonCancel: 'border',
                                accept: () => {},
                            })
                        }
                        
                    }
                )
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
