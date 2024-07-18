<template>
<div>
    <card title="Publicaciones">
        <div class="m-4 flex">
            <div class="m-4 w-full md:w-1/3 lg:w-1/3 xl:w-1/3" v-for="(item, index) in publicaciones" v-bind:key="index">
                <card class="publicaciones" :w-title="item.title">
                    <span>{{ item.title }}</span>
                    <div class="m-4 flex">
                        <div class="w-full w-1/3">
                            <vs-button color="primary" type="filled" width="100px">
                                <span>Ver</span>
                            </vs-button>
                            <vs-button color="success" type="filled">
                                <span>Editar</span>
                            </vs-button>
                            <vs-button color="danger" type="filled">
                                <span>Eliminar</span>
                            </vs-button>
                        </div>

                    </div>
                </card>

            </div>
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
        DxGroupItem
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            solicitudes: [],
            moduloActivo: {},

            visualizarModulo: false,

            publicaciones: [{
                title: 'Publicacion 1',
                image: ''
            }, {
                title: 'Publicacion 2',
                image: ''
            }, {
                title: 'Publicacion 3',
                image: ''
            }, ]
        }
    },
    methods: {
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
</style>
