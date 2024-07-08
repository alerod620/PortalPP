<template>
<div>
    <card title="Solicitudes">
        <div class="row p-2" style="display: grid; place-items: center;" width="100%">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="solicitudes" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{visible:true,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'">
                <DxSelection mode="single" />

                <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup" :use-icons="true" :confirmDelete="true">
                    <DxPopup :visible.sync="visualizarSolicitud" :width="'60%'" height="auto" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Verificar cuenta" :showCloseButton="true">
                        <DxForm :form-data.sync="solicitudActiva" labelMode="floating" :read-only="true">
                            <DxItem item-type="group" :col-span="2" :col-count="2">
                                <DxItem data-field="Nombre" editor-type="dxTextBox" />
                                <DxItem data-field="Ruta" editor-type="dxTextBox" />
                                <DxItem data-field="NombreIcono" editor-type="dxTextBox" />
                                <DxItem data-field="Descripcion" editor-type="dxTextArea" />
                            </DxItem>
                        </DxForm>
                    </DxPopup>
                </DxEditing>

                <DxColumn :width="100" type="buttons" :allow-reordering="false">
                    <DxButton name="delete" />
                    <DxButton name="edit" />
                </DxColumn>
                <DxColumn width="auto" data-field="Id" data-type="string" alignment="center" :form-item="{ visible: false }" />
                <DxColumn width="auto" data-field="Nombre" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Ruta" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="NombreIcono" caption="Icono" data-type="string" alignment="center" />
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
    DxPopup
} from 'devextreme-vue/data-grid'

import {
    DxForm,
    DxItem,
} from 'devextreme-vue/form'
import 'devextreme-vue/text-area'

export default {
    name: 'Solicitudes',
    components: {
        DxDataGrid,
        DxSelection,
        DxColumn,
        DxEditing,
        DxButton,
        DxPopup,
        DxItem,
        DxForm,
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            solicitudes: [],
            solicitudActiva: {},

            visualizarSolicitud: false,
        }
    },
    methods: {
        cargarUsuarios() {
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

        verSolicitud(e) {
            console.log(e)
            this.solicitudActiva = e
            console.log(this.solicitudActiva)
            this.visualizarSolicitud = true
        }
    },
    mounted() {
        this.cargarUsuarios()
    }
}
</script>
