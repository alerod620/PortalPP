<template>
<div>
    <card v-if="vista == 0" title="Publicaciones">
        <vs-button class="m-2" color="success" type="filled" @click.native="nuevaPublicacion">
            <font-awesome-icon :icon="['fas', 'edit']" class="fa mr-1" />
            <span>Crear publicación</span>
        </vs-button>
        <div class="displayTail">
            <div class="p-2 w-full md:w-1/2 lg:w-1/2 xl:w-1/3" v-for="(item, index) in publicaciones" v-bind:key="index">
                <card class="publicaciones" :w-title="item.Titulo">
                    <span>{{ item.Titulo }}</span>
                    <div class="displayTail">
                        <vs-button class="m-2 w-full lg:w-1/3 xl:w-1/3" color="primary" type="filled" @click.native="editarPublicacion(item,3)">
                            <font-awesome-icon :icon="['fas', 'eye']" class="fa mr-1" />
                            <span>Ver</span>
                        </vs-button>
                        <vs-button v-if="permisoEdicion !== null" class="m-2 w-full lg:w-1/3 xl:w-1/3" color="success" type="filled" @click.native="editarPublicacion(item,2)">
                            <font-awesome-icon :icon="['fas', 'edit']" class="fa mr-1" />
                            <span>Editar</span>
                        </vs-button>
                        <vs-button v-if="permisoEdicion !== null" class="m-2 w-full lg:w-1/3 xl:w-1/3" color="danger" type="filled" @click.native="confirmarEliminacion(item)">
                            <font-awesome-icon :icon="['fas', 'trash']" class="fa mr-1" />
                            <span>Eliminar</span>
                        </vs-button>
                    </div>
                </card>

            </div>
        </div>

    </card>

    <div v-if="vista !== 0">
        <Publicacion :tipo="vista" @regresar="regresarVista" @guardado="publicacionGuardada" :publicacion="publicacionSeleccionada" />
    </div>
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
import axios from 'axios'

import Publicacion from './Publicacion.vue'
import {
    confirm
} from 'devextreme/ui/dialog';

export default {
    name: 'Publicaciones',
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
        Publicacion
    },
    props: {},
    data() {
        return {
            DefaultDxGridConfiguration,
            solicitudes: [],

            vista: 0, //Variable para determinar que ver

            publicaciones: [],

            permisoEdicion: true,

            publicacionSeleccionada: null
        }
    },
    methods: {
        nuevaPublicacion() {
            this.vista = 1
        },

        editarPublicacion(e, vista) {
            console.log(e)
            this.publicacionSeleccionada = e
            this.publicacionSeleccionada.Activa = e.Estado == 1 ? true : false
            this.vista = vista
        },
        regresarVista() {
            this.vista = 0
        },
        publicacionGuardada() {
            this.vista = 0
            this.cargarPublicaciones()
        },
        cargarPublicaciones() {
            axios.post('http://localhost:3000/api/Publicaciones', {
                    Opcion: 1,
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.publicaciones = resp.data
                    }
                })
        },

        confirmarEliminacion(e) {
            confirm(`¿Está seguro de querer eliminar la publicación "${e.Titulo}"?`, 'Confirmar eliminación')
                .then((dialogResult) => {
                    if (dialogResult) {
                        this.eliminarPublicaciones(e);
                    } 
                });
        },

        eliminarPublicaciones(e) {
            axios.post('http://localhost:3000/api/Publicaciones', {
                    Opcion: 4,
                    IdPublicacion: e.IdPublicacion
                })
                .then(resp => {
                    if (resp.data.length > 0) {
                        this.cargarPublicaciones()
                    }
                })
        },
    },
    mounted() {
        this.cargarPublicaciones()
    }
}
</script>

<style>
.publicaciones {
    border: solid !important;
    border-color: black;
}

.botonesEditarPublicaciones {
    max-width: 100px !important;
}

.displayTail {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
