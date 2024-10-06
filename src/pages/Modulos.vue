<template>
<div>
    <card title="Módulos">
        <div class="row p-2" style="display: grid; place-items: center;" width="100%">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="modulos" :paging="{enabled: true}" :filter-sync-enabled="true" :searchPanel="{ visible: true }" :height="'100%'" :width="'100%'" :on-row-inserting="crearModulo" :on-row-inserted="cargarModulos" :on-row-updating="editarModulo" :on-row-updated="cargarModulos" :on-row-removing="eliminarModulo" :on-row-removed="cargarModulos" @init-new-row="onInitNuevoRegistro" @editing-start="onEditarRegistro">
                <DxSelection mode="single" />

                <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup" :use-icons="true" :confirmDelete="true">
                    <DxPopup :width="'60%'" height="auto" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Módulo" :showCloseButton="true" />

                    <DxForm :form-data.sync="moduloActivo" label-mode="floating" height="'100%'" :col-count="1">
                        <!-- <DxGroupItem> -->
                        <DxGroupItem :col-count="2">
                            <DxItem data-field="Nombre" editor-type="dxTextBox" />
                            <DxItem data-field="Ruta" editor-type="dxTextBox" />
                            <DxItem data-field="Icono" editor-type="dxTextBox" />
                            <DxItem data-field="Estado" editor-type="dxRadioGroup" :visible="mostrarEstado" :editor-options="{ items: estados, displayExpr:'text', valueExpr: 'id', layout:'horizontal' }" />
                        </DxGroupItem>
                        <DxGroupItem :col-count="1">
                            <DxItem data-field="Descripcion" editor-type="dxTextArea" :editor-options="{ height: '100px' }" />
                        </DxGroupItem>
                        <!-- </DxGroupItem> -->
                    </DxForm>
                </DxEditing>

                <DxColumn :width=" 100" type="buttons" :allow-reordering="false">
                    <DxButton name="delete" />
                    <DxButton name="edit" />
                </DxColumn>
                <DxColumn width="70px" data-field="IdModulo" caption="Id" data-type="string" alignment="center" :form-item="{ visible: false }" />
                <DxColumn width="10%" data-field="Nombre" data-type="string" alignment="center" />
                <DxColumn width="20%" data-field="Ruta" data-type="string" alignment="center" />
                <DxColumn width="100px" data-field="Icono" data-type="string" alignment="center" />
                <DxColumn width="100px" data-field="EstadoDescripcion" caption="Estado" data-type="string" alignment="center" />
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
    DxGroupItem
} from 'devextreme-vue/form'

import 'devextreme-vue/text-area'
import {
    DxRadioGroup
} from 'devextreme-vue/radio-group';

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
        DxRadioGroup
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            modulos: [],
            moduloActivo: {},

            visualizarModulo: false,

            estados: [{
                id: 1,
                text: 'Activo'
            }, {
                id: 2,
                text: 'Inactivo'
            }, ],

            mostrarEstado: false,
        }
    },
    methods: {
        cargarModulos() {
            axios.post('http://localhost:3000/api/Modulos', {
                    Opcion: 1
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.modulos = resp.data
                    }
                })
        },

        crearModulo(e) {
            axios.post('http://localhost:3000/api/Modulos', {
                    Opcion: 2,
                    Nombre: e.data.Nombre,
                    Descripcion: e.data.Descripcion,
                    Ruta: e.data.Ruta,
                    Icono: e.data.Icono,
                    Estado: 1
                })
                .then(resp => {
                    console.log(resp.data)
                    if (resp.data.length > 0) {
                        this.modulos = resp.data
                    }
                })
        },

        editarModulo(e) {
            e.cancel = new Promise((resolve, reject) => {
                this.axios.post('http://localhost:3000/api/Modulos', {
                    Opcion: 3,
                    Nombre: e.newData.Nombre ? e.newData.Nombre : e.oldData.Nombre,
                    Descripcion: e.newData.Descripcion ? e.newData.Descripcion : e.oldData.Descripcion,
                    Ruta: e.newData.Ruta ? e.newData.Ruta : e.oldData.Ruta,
                    Icono: e.newData.Icono ? e.newData.Icono : e.oldData.Icono,
                    Estado: e.newData.Estado ? e.newData.Estado : e.oldData.Estado,
                    Id: e.oldData.IdModulo
                }).then((resp) => {
                    resp.data[0].codigo == 0 ? resolve(false) : resolve(true)
                }).catch((err) => {
                    reject(err.descripcion ? err.descripcion : err)
                })
            })
        },

        eliminarModulo(e) {
            e.cancel = new Promise((resolve, reject) => {
                this.axios.post('http://localhost:3000/api/Modulos', {
                    Opcion: 4,
                    Id: e.data.IdModulo
                }).then((resp) => {
                    resp.data[0].codigo == 0 ? resolve(false) : resolve(true)
                }).catch((err) => {
                    reject(err.descripcion ? err.descripcion : err)
                })
            })
        },

        onInitNuevoRegistro(e) {
            this.mostrarEstado = false
        },

        onEditarRegistro(e)
        {
            this.mostrarEstado = true
        }
    },
    mounted() {
        this.cargarModulos()
    }
}
</script>
