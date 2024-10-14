<template>
<div>
    <card title="Permisos">
        <div class="row p-2" style="display: grid; place-items: center;" width="100%">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="roles" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{ visible: true, allowSearch: true }" :searchPanel="{ visible: true }" :height="'100%'" :width="'100%'" :on-row-inserting="crearRol" :on-row-inserted="cargarRol" :on-row-updating="editarRol" :on-row-updated="cargarRol" :on-row-removing="eliminarRol" :on-row-removed="cargarRol" @editing-start="onEditarRegistro">
                <DxSelection mode="single" />

                <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup" :use-icons="true" :confirmDelete="true">
                    <DxPopup :width="'50%'" height="auto" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Rol" :showCloseButton="true" />

                    <DxForm :form-data.sync="fomulario" label-mode="floating" height="'100%'" :col-count="2">
                        <DxGroupItem>
                            <DxItem data-field="NombreRol" editor-type="dxTextBox">
                                <DxLabel test="Nombre" />
                            </DxItem>
                            <DxItem data-field="Descripcion" editor-type="dxTextArea" :editor-options="{ height: '100px'}" />
                        </DxGroupItem>
                        <DxItem template="lista" />
                    </DxForm>
                </DxEditing>

                <DxColumn :width=" 100" type="buttons" :allow-reordering="false">
                    <DxButton name="delete" />
                    <DxButton name="edit" />
                </DxColumn>
                <DxColumn width="auto" data-field="IdRol" caption="Id" data-type="string" alignment="center" :form-item="{ visible: false }" />
                <DxColumn width="auto" data-field="NombreRol" caption="Nombre" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Descripcion" caption="Descripción" data-type="string" alignment="center" />

                <template #lista="{}">
                    <div>
                        <DxList :ref="listaPermisos" height="160px" :selected-items="permisosCargados" :data-source="permisos" width="auto" :show-selection-controls="true" :selection-mode="'multiple'" :select-all-mode="'allPages'" :select-by-click="true" :search-enabled="true" search-expr="text" />
                    </div>
                </template>
            </DxDataGrid>
        </div>
        <div>
            <span class="caption">Selected IDs: </span>
            <span>{{ permisosSeleccionados.join(", ") }}</span>
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
    DxList
} from 'devextreme-vue/list';

import ArrayStore from 'devextreme/data/array_store';

import axios from 'axios'
const listaPermisos = 'listaPermisos'

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
        DxList,
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            listaPermisos,
            solicitudes: [],
            fomulario: {},

            visualizarModulo: false,

            roles: [],
            permisos: null,
            permisosSeleccionados: [],
            permisosCargados: []
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
            let permisos = this.listadoPermisos.option("selectedItems").map(permiso => permiso.id)
            axios.post('http://localhost:3000/api/Roles', {
                    Opcion: 2,
                    Nombre: e.data.NombreRol,
                    Descripcion: e.data.Descripcion,
                    Permisos: permisos
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.modulos = resp.data
                    }
                })
        },

        editarRol(e) {
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

        onSelectionChanged(e) {
            const selectedItems = e.component.option("selectedItems");
            this.permisosSeleccionados = selectedItems;
            console.log('Permisos seleccionados:', this.permisosSeleccionados);
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

        async cargarPermisos() {
            await axios.post('http://localhost:3000/api/Permisos', {
                    Opcion: 1
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.permisos = new ArrayStore({
                            key: 'id',
                            data: resp.data.map((x) => {
                                return {
                                    id: x.IdPermiso,
                                    text: x.NombrePermiso
                                }
                            })
                        })
                    }
                })
        },

        listarPermisosRol(idRol) {
            axios.post('http://localhost:3000/api/Permisos_Rol', {
                    Opcion: 1,
                    Rol: idRol
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.permisosCargados = resp.data.map((x) => {
                            return {
                                id: x.Permiso
                            }
                        })
                    }
                })
        },

        onEditarRegistro(e) {
            this.permisosCargados = []
            this.listarPermisosRol(e.data.IdRol)
        }
    },
    beforeMount() {
        this.cargarPermisos()
    },
    mounted() {
        this.cargarRol()
    },
    watch: {
        permisosSeleccionados(newVal) {
            console.log('Permisos seleccionados:', newVal);
        }
    },
    computed: {
        listadoPermisos: function () {
            return this.$refs[listaPermisos].instance;
        },
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
