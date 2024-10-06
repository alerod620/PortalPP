<template>
<div id="cateteres">
    <card title="Permisos">
        <div class="row p-2" style="display: grid; place-items: center;" width="100%">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="roles" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{ visible: true, allowSearch: true }" :searchPanel="{ visible: true }" :height="'100%'" :width="'100%'" :on-row-inserting="crearRol" :on-row-inserted="cargarRol" :on-row-updating="editarRol" :on-row-updated="cargarRol" :on-row-removing="eliminarRol" :on-row-removed="cargarRol">
                <DxSelection mode="single" />

                <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup" :use-icons="true" :confirmDelete="true">
                    <DxPopup :width="'20%'" height="auto" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Módulo" :showCloseButton="true" />

                    <DxForm :form-data.sync="moduloActivo" label-mode="floating" height="'100%'">
                            <DxGroupItem :col-span="2">
                                <DxItem data-field="NombreRol" editor-type="dxTextBox">
                                    <DxLabel test="Nombre" />
                                </DxItem>   
                                <DxItem data-field="Descripcion" editor-type="dxTextArea" :editor-options="{ height: '100px'}" />
                            </DxGroupItem>
                    </DxForm>
                </DxEditing>

                <DxColumn :width=" 100" type="buttons" :allow-reordering="false">
                    <DxButton name="delete" />
                    <DxButton name="edit" />
                </DxColumn>
                <DxColumn width="auto" data-field="IdRol" caption="Id" data-type="string" alignment="center" :form-item="{ visible: false }" />
                <DxColumn width="auto" data-field="NombreRol" caption="Nombre" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Descripcion" caption="Descripción" data-type="string" alignment="center" />
            </DxDataGrid>
        </div>
    </card>
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
    DxButton,
    DxPopup,
    DxForm,
} from 'devextreme-vue/data-grid'

import {
    DxItem,
    DxGroupItem,
    DxLabel
} from 'devextreme-vue/form'

import 'devextreme-vue/text-area'

import {
    DxScrollView
} from 'devextreme-vue/scroll-view';

import axios from 'axios'

export default {
    name: 'Roles',
    components: {
        DxDataGrid,
        DxSelection,
        DxColumn,
        DxEditing,
        DxButton,
        DxPopup,
        DxForm,
        DxItem,
        DxGroupItem,
        DxLabel,
        DxScrollView
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            solicitudes: [],
            moduloActivo: {},

            visualizarModulo: false,

            roles: []
        }
    },
    methods: {
        cargarRol() {
            axios.post('http://localhost:3000/api/Roles', {
                    Opcion: 1
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.roles = resp.data
                    }
                })
        },

        crearRol(e) {
            axios.post('http://localhost:3000/api/Roles', {
                    Opcion: 2,
                    Nombre: e.data.NombreRol,
                    Descripcion: e.data.Descripcion,
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.modulos = resp.data
                    }
                })
        },

        editarRol(e) {
            console.log(e)
            e.cancel = new Promise((resolve, reject) => {
                this.axios.post('http://localhost:3000/api/Roles', {
                    Opcion: 3,
                    Nombre: e.newData.NombreRol ? e.newData.NombreRol : e.oldData.NombreRol,
                    Descripcion: e.newData.Descripcion ? e.newData.Descripcion : e.oldData.Descripcion,
                    Id: e.oldData.IdRol
                }).then((resp) => {
                    resp.data[0].codigo == 0 ? resolve(false) : resolve(true)
                }).catch((err) => {
                    reject(err.descripcion ? err.descripcion : err)
                })
            })
        },

        eliminarRol(e) {
            e.cancel = new Promise((resolve, reject) => {
                this.axios.post('http://localhost:3000/api/Roles', {
                    Opcion: 4,
                    Id: e.data.IdRol
                }).then((resp) => {
                    resp.data[0].codigo == 0 ? resolve(false) : resolve(true)
                }).catch((err) => {
                    reject(err.descripcion ? err.descripcion : err)
                })
            })
        },
    },
    mounted() {
        this.cargarRol()
    }
}
</script>

    
<style>
#listaModulos .check-box {
    border-color: #e3e3e3;
    border-style: dotted;
    border-width: 1px;
}
</style>
