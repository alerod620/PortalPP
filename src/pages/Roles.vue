<template>
<div>
    <card title="Permisos">
        <div class="row p-2" style="display: grid; place-items: center;" width="100%">
            <DxDataGrid :ref="tablaRoles" v-bind="DefaultDxGridConfiguration" :data-source="roles" :filter-sync-enabled="true" :headerFilter="{ visible: true, allowSearch: true }" :searchPanel="{ visible: true }" :height="'100%'" :width="'100%'" :on-row-inserting="crearRol" :on-row-inserted="cargarRol" :on-row-updating="editarRol" :on-row-updated="cargarRol" :on-row-removing="eliminarRol" :on-row-removed="cargarRol">
                <DxSelection mode="single" />

                <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup" :use-icons="true" :confirmDelete="true">
                    <DxPopup :width="'30%'" height="auto" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Rol" :showCloseButton="true" />

                    <DxForm :form-data.sync="formulario" label-mode="floating" height="'100%'" :col-count="1">
                        <DxGroupItem>
                            <DxItem data-field="NombreRol" editor-type="dxTextBox">
                                <DxLabel test="Nombre" />
                            </DxItem>
                            <DxItem data-field="Descripcion" editor-type="dxTextArea" :editor-options="{ height: '100px'}" />
                        </DxGroupItem>
                        <!-- <DxItem data-field="Permisos" template="lista" /> -->
                    </DxForm>
                </DxEditing>

                <DxColumn :width="100" type="buttons" :allow-reordering="false" :buttons="['delete', 'edit', {
                    icon:'fa fa-key',
                    hint:'Permisos',
                    onClick: (e) =>{
                        mostrarPermisos(e)
                    }
                }]">
                </DxColumn>
                <DxColumn width="auto" data-field="IdRol" caption="Id" data-type="string" alignment="center" :form-item="{ visible: false }" />
                <DxColumn width="auto" data-field="NombreRol" caption="Nombre" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Descripcion" caption="Descripción" data-type="string" alignment="center" />
            </DxDataGrid>
        </div>
    </card>
    <PermisosPopup :visible.sync="visualizarPermisos" width="40%" height="500px" :show-title="true" :full-screen="false" :hide-on-outside-click="false" :title="NombreRolEditar" :showCloseButton="true">
        <DxList :ref="listaPermisos" :selected-items="permisosCargados" :data-source="permisos" width="auto" :show-selection-controls="true" :selection-mode="'multiple'" :select-all-mode="'allPages'" :select-by-click="true" :search-enabled="true" search-expr="text" />

        <DxToolbarItem widget="dxButton" toolbar="bottom" location="after" :options="{ width: 98, text: 'Guardar', onClick: (e) => { this.actualizarPermisos(e) } }" />
        <DxToolbarItem widget="dxButton" toolbar="bottom" location="after" :options="{ width: 98, text: 'Cancelar', onClick: () => { this.visualizarPermisos = false } }" />

    </PermisosPopup>
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

import {
    DxPopup as PermisosPopup,
    DxToolbarItem
} from 'devextreme-vue/popup';

import axios from 'axios'
const listaPermisos = 'listaPermisos'
const tablaRoles = 'tablaRoles'

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
        PermisosPopup,
        DxToolbarItem
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            listaPermisos,
            tablaRoles,
            solicitudes: [],
            formulario: {
                NombreRol: null,
                Descricpion: null,
                Permisos: null
            },

            visualizarModulo: false,

            visualizarPermisos: false,
            IdRolEditar: null,
            NombreRolEditar: null,

            roles: [],
            permisos: null,
            permisosSeleccionados: [],
            permisosIniciales: [], //Variable para almecenar los permisos que tenía al principio el rol antes de editar
            permisosCargados: [] //Variable para cargar los permisos del rol que se editará
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

        mostrarPermisos(e) {
            console.log(e)
            this.visualizarPermisos = true
            this.IdRolEditar = e.row.data.IdRol
            this.NombreRolEditar = 'Permisos ' + e.row.data.NombreRol

            this.permisosCargados = []
            this.listarPermisosRol(this.IdRolEditar)
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
            e.cancel = new Promise((resolve) => {
                this.axios.post('http://localhost:3000/api/Roles', {
                    Opcion: 3,
                    Nombre: e.newData.NombreRol ? e.newData.NombreRol : e.oldData.NombreRol,
                    Descripcion: e.newData.Descripcion ? e.newData.Descripcion : e.oldData.Descripcion,
                    Id: e.oldData.IdRol
                }).then((resp) => {
                    resp.data.codigo == 0 ? resolve(false) : resolve(true)
                }).catch((err) => {
                    console.error(err); 
                })
            })
        },

        eliminarRol(e) {
            e.cancel = new Promise((resolve) => {
                this.axios.post('http://localhost:3000/api/Roles', {
                    Opcion: 4,
                    Id: e.data.IdRol
                }).then((resp) => {
                    resp.data.codigo == 0 ? resolve(false) : resolve(true)
                }).catch((err) => {
                    console.error(err); 
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

        listarPermisosRol(IdRol) {
            axios.post('http://localhost:3000/api/Permisos_Rol', {
                    Opcion: 1,
                    Rol: IdRol
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.permisosCargados = resp.data.map((x) => {
                            return {
                                id: x.Permiso,
                                text: x.Nombre
                            }
                        })

                        this.permisosIniciales = resp.data.map(x => x.Permiso)
                    }
                })
        },

        actualizarPermisos(e) {
            let nuevosPermisos = this.listadoPermisos.option('selectedItems').map(permiso => permiso.id)

            let permisosAgregar = nuevosPermisos.filter(permiso => !this.permisosIniciales.includes(permiso));
            let permisosEliminar = this.permisosIniciales.filter(permiso => !nuevosPermisos.includes(permiso));

            axios.post('http://localhost:3000/api/Permisos_Rol', {
                    Actualizar: true,
                    Rol: this.IdRolEditar,
                    Agregar: permisosAgregar,
                    Eliminar: permisosEliminar
                })
                .then((resp) => {
                    if(resp.data.codigo == 0)
                    {
                        this.visualizarPermisos = false
                    }
                }).catch((err) => {
                    console.error(err); 
                })
        },
    },
    beforeMount() {
        this.cargarPermisos()
    },
    mounted() {
        this.cargarRol()
    },
    watch: {},
    computed: {
        listadoPermisos: function () {
            return this.$refs[listaPermisos].instance;
        },

        dataGridRoles: function () {
            return this.$refs[tablaRoles].instance;
        },
    }
}
</script>

<style>
.dx-item.dx-toolbar-item.dx-toolbar-label {
    max-width: none !important; /* Elimina el max-width */
    width: auto; /* Ajusta el ancho según el contenido */
}
</style>
