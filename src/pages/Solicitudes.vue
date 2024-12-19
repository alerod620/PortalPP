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
                        <DxGroupItem :col-span="2">
                            <DxButtonItem :button-options="buttonBuscarUsuario" horizontal-alignment="center" verical-alignment="center" />
                        </DxGroupItem>
                        <DxItem data-field="Nombre" editor-type="dxTextBox" />
                        <DxItem data-field="Apellido" editor-type="dxTextBox" />
                        <DxItem data-field="DPI" editor-type="dxTextBox" />
                        <DxItem data-field="Registro" editor-type="dxTextBox" />
                        <!-- <DxItem data-field="TipoUsuario" editor-type="dxTextBox" /> -->
                    </DxItem>
                </DxGroupItem>
            </DxForm>
            <div v-if="verImagen" style="display: grid; place-items: center;" class="mt-2">
                <img :src="solicitudActiva.Imagen" style="width: 500px; height: 300px; object-fit: cover">
            </div>
        </div>
        <DxToolbarItem widget="dxButton" toolbar="bottom" location="center" :options="{ width: 130, text: 'Aceptar', type: 'success', icon: 'check' }" />
        <DxToolbarItem widget="dxButton" toolbar="bottom" location="center" :options="{ width: 130, text: 'Rechazar', type: 'danger', icon: 'close', onClick: () => { this.rechazado = true }  }" />
    </DxPopup>

    <DxPopup :visible.sync="rechazado" :width="'30%'" height="'30%'" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Motivo de rechazo" :showCloseButton="true">
        <div>
            <DxForm :form-data.sync="rechazoSolicitud" labelMode="floating" :read-only="verImagen">
                <DxGroupItem :col-count="1">
                    <DxItem data-field="Motivo" editor-type="dxTextBox" />
                </DxGroupItem>
            </DxForm>
        </div>
        <DxToolbarItem widget="dxButton" toolbar="bottom" location="center" :options="{ width: 130, text: 'Aceptar', type: 'success', }" />
        <DxToolbarItem widget="dxButton" toolbar="bottom" location="center" :options="{ width: 130, text: 'Cancelar', type: 'danger', }" />
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
    DxToolbar
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
        DxToolbarItem
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            solicitudes: [],
            solicitudActiva: {},

            visualizarSolicitud: false,

            verImagen: false,

            buttonBuscarUsuario: {
                width: 'auto',
                icon: 'fa fa-search',
                text: 'Buscar usuario',
                type: 'success',
                useSubmitBehavior: true,
                onClick: () => {
                    // this.BuscarOrdenes()
                }
            },

            rechazado: false, //Variable para saber cuando se rechazará una solicitud

            rechazoSolicitud: {}
        }
    },
    methods: {
        cargarSolicitudes() {
            axios.post('http://localhost:3000/api/Solicitudes', {
                    Opcion: 1
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.solicitudes = resp.data
                    }
                })
        },

        verSolicitud(e) {
            this.solicitudActiva = e
            this.visualizarSolicitud = true

            console.log(this.solicitudActiva)
        },

        buscarUsuario() {
            console.log(this.solicitudActiva)
            axios({
                    method: 'post',
                    url: 'http://localhost:3000/api/Usuarios',
                    data: {
                        Opcion: 2,
                        Registro: registro
                    },
                })
                .then((resp) => {
                    if (resp.data.length > 0) {
                        this.usuarios = resp.data
                    }
                });

        },

    },
    mounted() {
        this.cargarSolicitudes()
    }
}
</script>
