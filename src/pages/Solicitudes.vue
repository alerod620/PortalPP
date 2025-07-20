<template>
<div>
    <card title="Solicitudes">
        <div class="row p-2" style="display: grid; place-items: center;">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :columnAutoWidth="true" :data-source="solicitudes" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{visible:true,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'">
                <DxSelection mode="single" />

                <DxToolbar>
                    <DxItem name="searchPanel" />
                    <DxItem location="before">
                        <DxButton icon="add" type="default" styling-mode="contained" hint="Agregar nuevo" />
                    </DxItem>
                </DxToolbar>

                <DxEditing :allow-updating="false" :allow-adding="false" :allow-deleting="false" mode="popup" :use-icons="true" :confirmDelete="true" />

                <DxColumn :width="50" type="buttons" :buttons="[
                    {
                        icon:'fa fa-eye',
                        hint:'Verificar solicitud',
                        onClick: (e)=>{
                            this.verImagen = true
                            this.verSolicitud(e.row.data)
                        }
                    }
                        ]" :allow-reordering="false" />
                <DxColumn width="auto" data-field="Nombre" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Apellido" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Correo" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Telefono" caption="Teléfono" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="CUI" data-type="string" alignment="center" />
            </DxDataGrid>
        </div>
    </card>

    <DxPopup :visible.sync="visualizarSolicitud" :width="'60%'" height="'30%'" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Verificar cuenta" :showCloseButton="true">
        <div>
            <DxForm :form-data.sync="solicitudActiva" labelMode="floating" :read-only="verImagen">
                <DxGroupItem :col-count="2">
                    <DxItem caption="Información solicitud" item-type="group" :col-count="2">
                        <DxItem data-field="Nombre" editor-type="dxTextBox" />
                        <DxItem data-field="Apellido" editor-type="dxTextBox" />
                        <DxItem data-field="CUI" editor-type="dxTextBox" />
                        <DxItem data-field="Telefono" editor-type="dxTextBox" />
                        <!-- <DxItem data-field="TipoUsuario" editor-type="dxTextBox" /> -->
                    </DxItem>
                    <DxItem caption="Información usuario" item-type="group" :col-count="2">
                        <!-- <DxItem v-if="usuariosEncontrados.length > 1" template="botones" /> -->
                        <DxGroupItem :col-span="2">
                            <DxButtonItem :button-options="buttonBuscarUsuario" horizontal-alignment="center" verical-alignment="center" />
                        </DxGroupItem>
                        <DxItem data-field="NombreUsuario" editor-type="dxTextBox">
                            <DxLabel text="Nombre" />
                        </DxItem>
                        <DxItem data-field="ApellidoUsuario" caption="Apellido" editor-type="dxTextBox">
                            <DxLabel text="Apellido" />
                        </DxItem>
                        <DxItem data-field="CUIUsuario" editor-type="dxTextBox">
                            <DxLabel text="CUI" />
                        </DxItem>
                        <DxItem data-field="TelefonoUsuario" caption="Teléfono" editor-type="dxTextBox">
                            <DxLabel text="Teléfono" />
                        </DxItem>
                        <!-- <DxItem data-field="TipoUsuario" editor-type="dxTextBox" /> -->
                    </DxItem>
                </DxGroupItem>

                <!-- <template #botones>
                    <div class="buttons">
                        <div class="p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 div-button" v-for="(item, index) in usuariosEncontrados" v-bind:key="index">
                            <vs-button class="button" color="dark" type="border" @click.native="OpcionSeleccionada(item)">
                                <div>
                                    <font-awesome-icon :icon="['fas', this.posiblesUsuarios.find((x) => x.id === item.TipoUsuario).icono]" class="i-size" />
                                </div>
                                <span>{{this.posiblesUsuarios.find((x) => x.id === item.TipoUsuario).texto}}</span>
                            </vs-button>
                        </div>
                    </div>
                </template> -->
            </DxForm>
            <div v-if="verImagen" style="display: grid; place-items: center;" class="mt-2">
                <img :src="solicitudActiva.Imagen" style="width: 500px; height: 300px; object-fit: cover">
            </div>
        </div>
        <DxToolbarItem widget="dxButton" toolbar="bottom" location="center" :options="{ width: 130, text: 'Aceptar', type: 'success', icon: 'check', onClick: () => { this.actualizarSolicitud(2, null) } }" />
        <DxToolbarItem widget="dxButton" toolbar="bottom" location="center" :options="{ width: 130, text: 'Rechazar', type: 'danger', icon: 'close', onClick: () => { this.rechazado = true }  }" />
    </DxPopup>

    <DxPopup :visible.sync="rechazado" :width="'30%'" height="'30%'" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Motivo de rechazo" :showCloseButton="true">
        <div>
            <DxForm :form-data.sync="rechazoSolicitud" labelMode="floating">
                <DxGroupItem :col-count="1">
                    <DxItem data-field="Motivo" editor-type="dxSelectBox" :editor-options="{ width: 'auto', searchEnabled: true, items: motivoRechazo, }" :validationRules="[{ type: 'required' }]" />
                </DxGroupItem>
            </DxForm>
        </div>
        <DxToolbarItem widget="dxButton" toolbar="bottom" location="center" :options="{ width: 130, text: 'Aceptar', type: 'success', onClick: () => { this.actualizarSolicitud(3, this.rechazoSolicitud.Motivo) } }" />
        <DxToolbarItem widget="dxButton" toolbar="bottom" location="center" :options="{ width: 130, text: 'Cancelar', type: 'danger', onClick: () => { this.rechazado = false } }" />
    </DxPopup>

    <DxPopup :visible.sync="usuarioComponente" :width="'90%'" height="'auto%'" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Usuarios" :showCloseButton="true">
        <div>
            <Usuarios :usoComponente="true" @usuario="seleccionarUsuario" />
        </div>
    </DxPopup>
</div>
</template>

<script>
import {
    DefaultDxGridConfiguration
} from './data'
import {
    DxDataGrid,
    DxSelection,
    DxColumn,
    DxEditing,
    DxToolbar,
    DxLabel
} from 'devextreme-vue/data-grid'
import {
    DxTabs,
    DxItem as DxTabsItem
} from 'devextreme-vue/tabs';

import {
    DxForm,
    DxItem,
    DxGroupItem,
    DxButtonItem,
} from 'devextreme-vue/form'

import {
    DxPopup,
    DxToolbarItem
} from 'devextreme-vue/popup'

import DxButton from 'devextreme-vue/button'

import Usuarios from './Usuarios.vue'

import axios from 'axios'

export default {
    name: 'Solicitudes',
    components: {
        DxDataGrid,
        DxSelection,
        DxColumn,
        DxEditing,
        DxToolbar,
        DxPopup,
        DxItem,
        DxForm,
        DxGroupItem,
        DxButton,
        DxButtonItem,
        DxToolbarItem,
        DxLabel,
        DxTabs,
        DxTabsItem,
        Usuarios
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            solicitudes: [],

            // Guarda le información de la solucitid que se está revisando
            solicitudActiva: {
                Nombre: null,
                Apellido: null,
                CUI: null,
                Telefono: null,
                Correo: null,
                NombreUsuario: null,
                ApellidoUsuario: null,
                CUIUsuario: null,
                TelefonoUsuario: null,
            },

            visualizarSolicitud: false,

            verImagen: false,

            buttonBuscarUsuario: {
                width: 'auto',
                icon: 'fa fa-search',
                text: 'Buscar usuario',
                type: 'success',
                useSubmitBehavior: true,
                onClick: () => {
                    this.usuarioComponente = true
                }
            },

            rechazado: false, //Variable para saber cuando se rechazará una solicitud

            usuarioComponente: false, //Variable para saber cuando se mostrará el componente de buscar usuario

            rechazoSolicitud: {},

            motivoRechazo: ['DPI incorrecto', 'No existe usuario con el CUI indicado']
        }
    },
    methods: {
        cargarSolicitudes() {
            axios.post('http://localhost:3000/api/Solicitudes', {
                    Opcion: 1
                })
                .then(resp => {
                    this.solicitudes = resp.data
                })
        },

        actualizarSolicitud(estado, motivo) { // estado = 2 'aprobada', estado = 3 'rechazada' (estado = 1 'pendiente' pero se maneja en base datos)

            axios.post('http://localhost:3000/api/Solicitudes', {
                    Opcion: 3,
                    Nombre: this.solicitudActiva.Nombre,
                    Apellido: this.solicitudActiva.Apellido,
                    Correo: this.solicitudActiva.Correo,
                    Telefono: this.solicitudActiva.Telefono,
                    CUI: this.solicitudActiva.CUI,
                    IdSolicitud: this.solicitudActiva.IdSolicitudCuenta,
                    Estado: estado,
                    MotivoRechazo: motivo,
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.rechazado = false // Se cambia el valor de la variable del modal de motivo de rechazo por si se está rechazando la solicitud
                        this.visualizarSolicitud = false // Se cambia el valor del modal que muestra la información de la solicitud
                        this.rechazoSolicitud.Motivo = null
                        if (estado == 2) {
                            this.$vs.dialog({
                                type: 'alert',
                                color: '#ed8c72',
                                title: 'Cuenta creada',
                                acceptText: 'Aceptar',
                                text: 'La cuenta ha sido creada para el CUI ' + this.solicitudActiva.CUI,
                                buttonCancel: 'border',
                                accept: () => {},
                            })
                        } else {
                            this.$vs.dialog({
                                type: 'alert',
                                color: '#ed8c72',
                                title: 'Cuenta rechazada',
                                acceptText: 'Aceptar',
                                text: 'La cuenta ha sido rechazada con éxito.',
                                buttonCancel: 'border',
                                accept: () => {},
                            })
                        }
                        this.cargarSolicitudes()
                    }
                })

        },

        verSolicitud(e) {
            // this.solicitudActiva = e
            this.solicitudActiva.Nombre = e.Nombre
            this.solicitudActiva.Apellido = e.Apellido
            this.solicitudActiva.CUI = e.CUI
            this.solicitudActiva.IdSolicitudCuenta = e.IdSolicitudCuenta
            this.solicitudActiva.Telefono = e.Telefono
            this.solicitudActiva.Correo = e.Correo

            this.visualizarSolicitud = true
            this.buscarUsuario()
        },

        buscarUsuario() { // Realiza la búsqueda del usuario por medio del CUI de la solicitud seleccionada
            axios({
                    method: 'post',
                    url: 'http://localhost:3000/api/ObtenerPersona',
                    data: {
                        Opcion: 1,
                        CUI: this.solicitudActiva.CUI
                    },
                })
                .then((resp) => {
                    if (resp.data.length > 0) {

                        let usuarioEncontrado = resp.data[0]

                        this.solicitudActiva.NombreUsuario = usuarioEncontrado.nombres
                        this.solicitudActiva.ApellidoUsuario = usuarioEncontrado.apellidos
                        this.solicitudActiva.CUIUsuario = usuarioEncontrado.numero_dpi
                        this.solicitudActiva.TelefonoUsuario = usuarioEncontrado.telefono
                    } else {
                        // MOSTRAR UN MENSAJE DE ERROR PARA QUE PUEDAN BUSCAR EL USUARIO
                        this.$vs.dialog({
                            type: 'alert',
                            color: '#ed8c72',
                            title: 'Usuario no encontrado',
                            acceptText: 'Aceptar',
                            text: 'No se encontró ningún usuario con el DPI ingresado .',
                            buttonCancel: 'border',
                            accept: () => {},
                        })
                    }
                });

        },

        seleccionarUsuario(e) {
            this.solicitudActiva.NombreUsuario = e.nombres
            this.solicitudActiva.ApellidoUsuario = e.apellidos
            this.solicitudActiva.CUIUsuario = e.numero_dpi
            this.solicitudActiva.TelefonoUsuario = e.telefono

            this.usuarioComponente = false
        },
    },
    mounted() {
        this.cargarSolicitudes()
    },
    computed: {}
}
</script>

<style>
.buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.button {
    height: 75px;
    width: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px !important;
}

.button:hover {
    background-color: rgb(0, 129, 151) !important;
}

.div-button {
    display: flex;
    justify-content: center;
}

.i-size {
    font-size: 20px;
    padding-bottom: 5px;
}
</style>
