<template>
<div>
    <card v-if="vista == 0" title="Publicaciones">
        <div class="displayTail">
            <div class="p-2 w-full md:w-1/2 lg:w-1/2 xl:w-1/3" v-for="(item, index) in publicaciones" v-bind:key="index">
                <card class="publicaciones" :w-title="item.title">
                    <span>{{ item.title }}</span>
                    <div class="displayTail">
                        <vs-button class="m-2 botonesEditarPublicaciones w-full xl:w-1/3" color="primary" type="filled" @click.native="verPublicacion">
                            <span>Ver</span>
                        </vs-button>
                        <vs-button v-if="modulo != 2" class="m-2 botonesEditarPublicaciones w-full lg:w-1/3 xl:w-1/3" color="success" type="filled" @click.native="editarPublicacion">
                            <span>Editar</span>
                        </vs-button>
                        <vs-button v-if="modulo != 2" class="m-2 botonesEditarPublicaciones w-full lg:w-1/3 xl:w-1/3" color="danger" type="filled">
                            <span>Eliminar</span>
                        </vs-button>
                    </div>
                </card>

            </div>
        </div>

    </card>

    <div v-if="vista !== 0">
        <Publicacion :edicion="vista == 1 ? false : true" @cancelar="() =>{ this.vista = 0}" />
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
        Publicacion
    },
    props: {
        modulo: null // Indica desde donde se está invocando al componente, para determinar que acciones mostrar
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            solicitudes: [],
            moduloActivo: {},

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
        }
    },
    methods: {
        verPublicacion() {
            this.vista = 1
            // this.$router.push('/publicacion')
        },
        editarPublicacion() {
            this.vista = 2
        },
        cargarModulos() {
            this.solicitudes = [{
                    Id: 1,
                    Nombre: 'Solicitudes',
                    Descripcion: 'Permite al usuario ver solicitudes',
                    Ruta: '/Solicitudes',
                    NombreIcono: 'fa fa-bell',
                },
                {
                    Id: 2,
                    Nombre: 'Usuarios',
                    Descripcion: 'Permite al usuario listar los usuarios',
                    Ruta: '/Usuarios',
                    NombreIcono: 'fa fa-users',
                },
                {
                    Id: 3,
                    Nombre: 'Módulos',
                    Descripcion: 'Permite al usuarios modificar los módulos',
                    Ruta: '/Módulos',
                    NombreIcono: 'fa fa-gears',
                }
            ]
        },
    },
    mounted() {
        this.cargarModulos()
    }
}
</script>

<style>
.publicaciones {
    border: solid !important;
    border-color: black;
}

.botonesEditarPublicaciones {
    max-width: 70px !important;
}

.displayTail {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
