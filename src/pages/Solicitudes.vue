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
                <DxColumn width="auto" data-field="TipoUsuario" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Registro" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="DPI" data-type="string" alignment="center" />
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
                        <DxItem data-field="DPI" editor-type="dxTextBox" />
                        <DxItem data-field="Registro" editor-type="dxTextBox" />
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
                        <DxItem data-field="ApellidoUsuario" editor-type="dxTextBox">
                            <DxLabel text="Apellido" />
                        </DxItem>
                        <DxItem data-field="DPIUsuario" editor-type="dxTextBox">
                            <DxLabel text="DPI" />
                        </DxItem>
                        <DxItem data-field="RegistroUsuario" editor-type="dxTextBox">
                            <DxLabel text="Registro" />
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
                DPI: null,
                Registro: null,
                Telefono: null,
                Correo: null,
                IdSolicitudCuenta: null,
                NombreUsuario: null,
                ApellidoUsuario: null,
                DPIUsuario: null,
                RegistroUsuario: null,
                IdUsuario: null,
                TipoUsuario: null
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

            usuariosEncontrados: [],

            usuarioEncontrado: {
                Nombre: null,
                Apellido: null,
                DPI: null,
                Registro: null
            },

            rechazado: false, //Variable para saber cuando se rechazará una solicitud

            usuarioComponente: false, //Variable para saber cuando se mostrará el componente de buscar usuario

            rechazoSolicitud: {},

            motivoRechazo: ['DPI incorrecto', 'No existe usuario con el registro indicado'],

            posiblesUsuarios: [{
                    id: 1,
                    texto: 'Viudo',
                    icono: 'fa-person-half-dress'
                },
                {
                    id: 2,
                    texto: 'Huefano',
                    icono: 'fa-hands-holding-child'
                }
            ]
        }
    },
    methods: {
        cargarSolicitudes() {
            axios.post('http://localhost:3000/api/Solicitudes', {
                    Opcion: 1
                })
                .then(resp => {
                    this.solicitudes = resp.data
                    // if (resp.data.length > 0) {
                    //     this.solicitudes = resp.data
                    // }
                })
        },

        actualizarSolicitud(estado, motivo) { // estado = 2 'aprobada', estado = 3 'rechazada' (estado = 1 'pendiente' pero se maneja en base datos)

            axios.post('http://localhost:3000/api/Solicitudes', {
                    Opcion: 3,
                    Nombre: this.solicitudActiva.Nombre,
                    Apellido: this.solicitudActiva.Apellido,
                    Correo: this.solicitudActiva.Correo,
                    Telefono: this.solicitudActiva.Telefono,
                    DPI: this.solicitudActiva.DPI,
                    Registro: this.solicitudActiva.Registro,
                    IdSolicitud: this.solicitudActiva.IdSolicitudCuenta,
                    Estado: estado,
                    MotivoRechazo: motivo,
                    Usuarios: this.usuariosEncontrados
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
                            text: 'La cuenta ha sido creada para el CUI ' + this.solicitudActiva.DPI,
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
            this.solicitudActiva.Registro = e.Registro
            this.solicitudActiva.DPI = e.DPI
            this.solicitudActiva.IdSolicitudCuenta = e.IdSolicitudCuenta
            this.solicitudActiva.Telefono = e.Telefono
            this.solicitudActiva.Correo = e.Correo

            this.visualizarSolicitud = true
            this.buscarUsuario()
        },

        buscarUsuario() { // Realiza la búsqueda del usuario por medio del registro de la solicitud seleccionada
            axios({
                    method: 'post',
                    url: 'http://localhost:3000/api/Usuarios',
                    data: {
                        Opcion: 2,
                        Registro: this.solicitudActiva.Registro
                    },
                })
                .then((resp) => {
                    if (resp.data.length > 0) {

                        this.usuariosEncontrados = resp.data
                        this.usuarioEncontrado = this.usuariosEncontrados[0] //Se deja con posición 0 por si trae más de 1 registro

                        this.solicitudActiva.NombreUsuario = this.usuarioEncontrado.Nombre
                        this.solicitudActiva.ApellidoUsuario = this.usuarioEncontrado.Apellido
                        this.solicitudActiva.RegistroUsuario = this.usuarioEncontrado.Registro
                        this.solicitudActiva.DPIUsuario = this.usuarioEncontrado.DPI
                        this.solicitudActiva.IdUsuario = this.usuarioEncontrado.IdUsuario
                        this.solicitudActiva.TipoUsuario = this.usuarioEncontrado.TipoUsuario
                    } else {
                        // MOSTRAR UN MENSAJE DE ERROR PARA QUE PUEDAN BUSCAR EL USUARIO
                    }
                });

        },

        seleccionarUsuario(e) {
            this.solicitudActiva.NombreUsuario = e.Nombre
            this.solicitudActiva.ApellidoUsuario = e.Apellido
            this.solicitudActiva.RegistroUsuario = e.Registro
            this.solicitudActiva.DPIUsuario = e.DPI
            this.solicitudActiva.IdUsuario = e.IdUsuario

            this.usuarioComponente = false
        },
    },
    mounted() {
        this.cargarSolicitudes()
    },
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
