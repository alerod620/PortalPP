<template>
<div>
    <card title="Permisos">
        <div class="row p-2" style="display: grid; place-items: center;" width="100%">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="permisos" :paging="{ enabled: true }" :filter-sync-enabled="true" :headerFilter="{ visible: true, allowSearch:true }" :searchPanel="{ visible: true }" :height="'100%'" :width="'100%'" :on-row-inserting="crearPermiso" :on-row-inserted="cargarPermisos" :on-row-updating="editarPermiso" :on-row-updated="cargarPermisos" :on-row-removing="eliminarPermiso" :on-row-removed="cargarPermisos">
                <DxSelection mode="single" />

                <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup" :use-icons="true" :confirmDelete="true">
                    <DxPopup :width="'60%'" height="auto" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Permiso" :showCloseButton="true" />

                    <DxForm :form-data.sync="formulario" label-mode="floating" height="'100%'" :col-count="1">
                        <DxGroupItem :col-count="2">
                            <DxGroupItem>
                                <DxItem data-field="Nombre" editor-type="dxTextBox" />
                                <DxItem data-field="Modulo" editor-type="dxSelectBox" :editor-options="{ width: 'auto', searchEnabled: true, items: modulos,  displayExpr: 'Nombre', valueExpr: 'IdModulo' }" />
                            </DxGroupItem>
                            <DxItem data-field="Descripcion" editor-type="dxTextArea" :editor-options="{ height: '100px'}" />
                        </DxGroupItem>
                        <!-- <DxGroupItem>
                            <DxGroupItem>
                                <DxItem v-for="(item, index) in modulos" v-bind:key="index" :data-field="item.text" editor-type="dxCheckBox" css-class="check-box">
                                    <DxLabel :text="item.text" />
                                </DxItem>
                            </DxGroupItem>
                        </DxGroupItem> -->
                    </DxForm>
                </DxEditing>

                <DxColumn :width=" 100" type="buttons" :allow-reordering="false">
                    <DxButton name="delete" />
                    <DxButton name="edit" />
                </DxColumn>
                <DxColumn width="auto" data-field="IdPermiso" caption="Id" data-type="string" alignment="center" :form-item="{ visible: false }" />
                <DxColumn width="auto" data-field="NombrePermiso" caption="Nombre" data-type="string" alignment="center" :form-item="{ visible: false }" />
                <DxColumn width="auto" data-field="NombreModulo" caption="Módulo" data-type="string" alignment="center" :form-item="{ visible: false }" />
                <DxColumn width="auto" data-field="Descripcion" caption="Descripción" data-type="string" alignment="center" />

                <!-- Se agregan estas dos columnas y se deja ocultas para que al momento de crear un nuevo permiso, el formulario tome los vales para la petición -->
                <DxColumn width="auto" data-field="Nombre" data-type="string" alignment="center" :visible="false" />
                <DxColumn width="auto" data-field="Modulo" data-type="number" alignment="center" :visible="false" />
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
    name: 'Modulos',
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
            formulario: {},

            visualizarModulo: false,

            permisos: [],
            modulos: []
        }
    },
    methods: {
        cargarPermisos() {
            axios.post('http://localhost:3000/api/Permisos', {
                    Opcion: 1
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.permisos = resp.data
                    }
                })
        },

        crearPermiso(e) {
            axios.post('http://localhost:3000/api/Permisos', {
                    Opcion: 2,
                    Nombre: e.data.Nombre,
                    Descripcion: e.data.Descripcion,
                    IdModulo: e.data.Modulo
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.permisos = resp.data
                    }
                })
        },

        editarPermiso(e) {
            e.cancel = new Promise((resolve, reject) => {
                this.axios.post('http://localhost:3000/api/Permisos', {
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

        eliminarPermiso(e) {
            e.cancel = new Promise((resolve, reject) => {
                this.axios.post('http://localhost:3000/api/Permisos', {
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
        this.cargarPermisos()
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
