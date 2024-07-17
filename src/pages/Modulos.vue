<template>
<div>
    <card title="Módulos">
        <div class="row p-2" style="display: grid; place-items: center;" width="100%">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="solicitudes" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{visible:true,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'">
                <DxSelection mode="single" />

                <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup" :use-icons="true" :confirmDelete="true">
                    <DxPopup  :width="'60%'" height="auto" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Módulo" :showCloseButton="true" />

                    <DxForm :form-data.sync="moduloActivo" label-mode="floating" height="'100%'">
                        <DxGroupItem :col-count="3">
                            <DxItem data-field="Nombre" editor-type="dxTextBox" />
                            <DxItem data-field="Ruta" editor-type="dxTextBox" />
                            <DxItem data-field="NombreIcono" editor-type="dxTextBox" />
                        </DxGroupItem>
                        <DxGroupItem :col-count="1">
                            <DxItem data-field="Descripcion" editor-type="dxTextArea" :editor-options="{ height: '100px'}" />
                        </DxGroupItem>
                    </DxForm>
                </DxEditing>

                <DxColumn :width=" 100" type="buttons" :allow-reordering="false">
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
