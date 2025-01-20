<template>
<div>
    <card v-if="vista == 0" title="Publicaciones">
        <vs-button class="m-2" color="success" type="filled" @click.native="nuevaPublicacion">
            <font-awesome-icon :icon="['fas', 'edit']" class="fa mr-1" />
            <span>Crear publicación</span>
        </vs-button>
        <div class="displayTail">
            <div class="p-2 w-full md:w-1/2 lg:w-1/2 xl:w-1/3" v-for="(item, index) in publicaciones" v-bind:key="index">
                <card class="publicaciones" :w-title="item.title">
                    <span>{{ item.title }}</span>
                    <div class="displayTail">
                        <vs-button class="m-2 botonesEditarPublicaciones w-full xl:w-1/3" color="primary" type="filled" @click.native="verPublicacion">
                            <font-awesome-icon :icon="['fas', 'eye']" class="fa mr-1" />
                            <span>Ver</span>
                        </vs-button>
                        <vs-button v-if="permisoEdicion !== null" class="m-2 botonesEditarPublicaciones w-full lg:w-1/3 xl:w-1/3" color="success" type="filled" @click.native="editarPublicacion">
                            <font-awesome-icon :icon="['fas', 'edit']" class="fa mr-1" />
                            <span>Editar</span>
                        </vs-button>
                        <vs-button v-if="permisoEdicion !== null" class="m-2 botonesEditarPublicaciones w-full lg:w-1/3 xl:w-1/3" color="danger" type="filled">
                            <font-awesome-icon :icon="['fas', 'trash']" class="fa mr-1" />
                            <span>Eliminar</span>
                        </vs-button>
                    </div>
                </card>

            </div>
        </div>

    </card>

    <div v-if="vista !== 0">
        <Publicacion :tipo="vista" @cancelar="regresarVista" />
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

import Publicacion from './Publicacion.vue'

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

            publicaciones: [{
                title: 'Publicacion 1',
                image: '',
                value: ''
            }, {
                title: 'Publicacion 2',
                image: '',
                value: ''
            }, {
                title: 'Publicacion 3',
                image: '',
                value: ''
            }, ],

            permisoEdicion: null
        }
    },
    methods: {
        nuevaPublicacion() {
            this.vista = 1
        },
        editarPublicacion() {
            this.vista = 2
        },
        verPublicacion() {
            this.vista = 3
            // this.$router.push('/publicacion')
        },
        regresarVista() {
            this.vista = 0
        },
        cargarPublicaciones() {},
    },
    mounted() {}
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
