<template>
<div>
    <card>
        <div class="row p-2" style="display: grid; place-items: center;" width="100%">
            <div class="row p-2" style="display: grid; place-items: center;" width="100%">
                <form @submit="handleSubmit">
                    <DxForm v-model:form-data="usuarioBusqueda" label-mode="floating" height="'100%'" :col-count="1">
                        <DxGroupItem :col-count="3">
                            <DxItem data-field="Registro" editor-type="dxTextBox" />
                            <DxItem data-field="Partida" editor-type="dxTextBox" />
                            <DxItem data-field="Plaza" editor-type="dxTextBox" />
                        </DxGroupItem>
                        <DxGroupItem>
                            <DxButtonItem :button-options="buttonBuscarUsuario" horizontal-alignment="center" verical-alignment="center" />
                        </DxGroupItem>
                    </DxForm>
                </form>
            </div>
            <div class="row p-2" style="display: grid; place-items: center;" width="100%">
                <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="usuarios" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{visible:true,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'">
                    <DxSelection mode="single" />

                    <DxColumn width="auto" data-field="Nombre" data-type="string" alignment="center" :form-item="{ visible: false }" />
                    <DxColumn width="auto" data-field="Apellido" data-type="string" alignment="center" />
                    <DxColumn width="auto" data-field="Correo" data-type="string" alignment="center" />
                    <DxColumn width="auto" data-field="CUI" data-type="string" alignment="center" />
                    <DxColumn width="auto" data-field="Registro" caption="Descripción" data-type="string" alignment="center" />
                    <DxColumn :width="50" type="buttons" :buttons="buttons" :allow-reordering="false" />
                </DxDataGrid>
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
} from 'devextreme-vue/data-grid'

import {
    DxForm,
    DxItem,
    DxGroupItem,
    DxButtonItem,
} from 'devextreme-vue/form'

import 'devextreme-vue/text-area'

export default {
    name: 'DeclaracionAdmin',
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
        DxButtonItem,
    },
    data() {
        return {
            DefaultDxGridConfiguration,

            usuarios: [{
                    Nombre: 'Juan',
                    Apellido: 'Perez',
                    Correo: 'prueba@prueba.com',
                    CUI: 123456798,
                    Registro: 123456,
                },
                {
                    Nombre: 'Pedro',
                    Apellido: 'Ramirez',
                    Correo: 'prueba1@prueba1.com',
                    CUI: 5768434364,
                    Registro: 654321,
                }, {
                    Nombre: 'Rpdrigo',
                    Apellido: 'Vasquez',
                    Correo: 'prueba2@prueba.com',
                    CUI: 5649724584,
                    Registro: 123456,
                },
                {
                    Nombre: 'Aaron',
                    Apellido: 'Jimenez',
                    Correo: 'prueba3 @prueba1.com',
                    CUI: 89 + 674321864,
                    Registro: 654321,
                }
            ],
            usuarioBusqueda: {},

            visualizarModulo: false,

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

            modalEnviar: false,
            
            buttons: [{
                icon: 'fa fa-cloud-upload',
                hint: 'Subir declaración',
                onClick: (e) => {
                    this.modalEnviar = true
                }
            }],
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
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
