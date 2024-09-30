<template>
<div id="cateteres">
    <card title="Permisos">
        <div class="row p-2" style="display: grid; place-items: center;" width="100%">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="solicitudes" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{visible:true,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'">
                <DxSelection mode="single" />

                <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup" :use-icons="true" :confirmDelete="true">
                    <DxPopup :width="'60%'" height="auto" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Módulo" :showCloseButton="true" />

                    <DxForm v-model:form-data="moduloActivo" label-mode="floating" height="'100%'" :col-span="1">
                        <DxGroupItem>
                            <DxGroupItem :col-span="2">
                                <DxItem data-field="Nombre" editor-type="dxTextBox" />
                                <DxItem data-field="Descripcion" editor-type="dxTextArea" :editor-options="{ height: '100px'}" />
                            </DxGroupItem>
                        </DxGroupItem>
                        <DxGroupItem>
                            <DxGroupItem>

                                <DxItem v-for="(item, index) in modulos" v-bind:key="index" :data-field="item.text" editor-type="dxCheckBox" css-class="check-box">
                                    <DxLabel :text="item.text" />
                                </DxItem>
                            </DxGroupItem>
                        </DxGroupItem>
                    </DxForm>
                </DxEditing>

                <DxColumn :width=" 100" type="buttons" :allow-reordering="false">
                    <DxButton name="delete" />
                    <DxButton name="edit" />
                </DxColumn>
                <DxColumn width="auto" data-field="Id" data-type="string" alignment="center" :form-item="{ visible: false }" />
                <DxColumn width="auto" data-field="Nombre" data-type="string" alignment="center" />
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
    DxGroupItem,
    DxLabel
} from 'devextreme-vue/form'

import 'devextreme-vue/text-area'

import {
    DxScrollView
} from 'devextreme-vue/scroll-view';

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
        DxLabel,
        DxScrollView
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            solicitudes: [],
            moduloActivo: {},

            visualizarModulo: false,

            modulos: [{
                    id: 1,
                    text: "Solicitudes",
                },
                {
                    id: 2,
                    text: "Usuarios",
                },
                {
                    id: 3,
                    text: "Módulos",
                },
                {
                    id: 4,
                    text: "Publicaciones",
                },
                {
                    id: 5,
                    text: "Reportes",
                },
                {
                    id: 6,
                    text: "Permisos",
                },
                {
                    id: 7,
                    text: "Recibos",
                },
                {
                    id: 8,
                    text: "Declaración de beneficiarios",
                }
            ]
        }
    },
    methods: {
        cargarPermisos() {
            this.solicitudes = [{
                    Id: 1,
                    Nombre: 'Viudo',
                    Descripcion: 'Usuarios beneficiarios por la muerte de su cónyugue',
                },
                {
                    Id: 2,
                    Nombre: 'Usuarios',
                    Descripcion: 'Usuarios beneficiarios por la muerte de un padre',
                },
                {
                    Id: 3,
                    Nombre: 'Trabajador',
                    Descripcion: 'Usuario que aporta al plan de prestaciones',
                },
                {
                    Id: 4,
                    Nombre: 'Jefe',
                    Descripcion: 'Usuario que puede los reportes del sistema',
                }
            ]
        },
    },
    mounted() {
        this.cargarPermisos()
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
