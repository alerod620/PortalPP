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
                                    <DxItem data-field="DPI" editor-type="dxTextBox" />
                                    <DxItem data-field="Contraseña" editor-type="dxTextBox" :editor-options="{ mode:'password' }" />
                                </DxGroupItem>
                            </DxForm>
                            <div class="mt-4" style="display: flex; justify-content: center;">
                                <vs-button class="buttonInicioSesion" color="success" type="filled">
                                    <span>Iniciar sesión</span>
                                </vs-button>
                            </div>
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
                            <DxForm :form-data.sync="registroUsuario" labelMode="floating" labelLocation="top">
                                <DxGroupItem item-type="group">
                                    <DxItem data-field="Nombre" editor-type="dxTextBox" :validationRules="[{ type: 'required' }]" />
                                    <DxItem data-field="Apellido" editor-type="dxTextBox" :validationRules="[{ type: 'required' }]" />
                                    <DxItem data-field="Correo" editor-type="dxTextBox" :validationRules="[{ type: 'required' }, { type: 'email', message: 'Correo no válido.' }]" />
                                    <DxItem data-field="Telefono" editor-type="dxTextBox" :editor-options="{ mask: '0000 0000', maskChar: '_', inputMode: 'numeric', maxLength: 8, minLength: 8 }" :validationRules="[{ type: 'required' }]">
                                        <DxLabel text="Teléfono" />
                                    </DxItem>
                                    <DxItem data-field="DPI" editor-type="dxTextBox" :editor-options="{ mask: '0000 00000 0000', maskChar: '_', inputMode: 'numeric' }" :validationRules="[{ type: 'required' }, { type: 'stringLength', min: 13, max: 13, message: 'El DPI debe tener 13 dígitos.' }]" />
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
import axios from 'axios'

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
        };
    },
    methods: {
        mensajeAceptar() {
            this.recuperarContraseña = false;
        },

        cambiarVista() {
            this.verInicioSesion = !this.verInicioSesion
        },

        handleSubmit(e) {
            e.preventDefault()
            if (this.verInicioSesion) {

            } else {
                this.crearSolicitud()
            }
        },

        crearSolicitud() {
            axios.post('http://localhost:3000/api/Solicitudes', {
                    Opcion: 2,
                    Nombre: this.registroUsuario.Nombre,
                    Apellido: this.registroUsuario.Apellido,
                    Correo: this.registroUsuario.Correo,
                    Telefono: this.registroUsuario.Telefono,
                    DPI: this.registroUsuario.DPI,
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        
                    }
                })
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
