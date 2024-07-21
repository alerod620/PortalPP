<template>
<div>
    <card title="Solicitudes">
        <div class="row p-2" style="display: grid; place-items: center;">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="solicitudes" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{visible:true,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'">
                <DxSelection mode="single" />

                <DxEditing :allow-updating="false" :allow-adding="false" :allow-deleting="false" mode="popup" :use-icons="true" :confirmDelete="true" />

                <DxColumn :width="50" type="buttons" :buttons="[
                {
                    icon:'fa fa-eye',
                    hint:'Verificar solicitud',
                    onClick: (e)=>{
                        this.verSolicitud(e.row.data)
                    }
                }
                    ]" :allow-reordering="false" />
                <DxColumn width="auto" data-field="Nombre" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Apellido" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="CUI" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Registro" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="TipoUsuario" data-type="string" alignment="center" />
            </DxDataGrid>
        </div>
    </card>

    <DxPopup v-model:visible="visualizarSolicitud" :width="'60%'" height="auto" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Verificar cuenta" :showCloseButton="true">
        <DxForm v-model:form-data="solicitudActiva" labelMode="floating" :read-only="true">
            <DxItem item-type="group" :col-span="2" :col-count="2">
                <DxItem data-field="Nombre" editor-type="dxTextBox" />
                <DxItem data-field="Apellido" editor-type="dxTextBox" />
                <DxItem data-field="CUI" editor-type="dxTextBox" />
                <DxItem data-field="Registro" editor-type="dxTextBox" />
                <DxItem data-field="TipoUsuario" editor-type="dxTextBox" />
            </DxItem>
        </DxForm>
    </DxPopup>
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
} from 'devextreme-vue/data-grid'

import {
    DxForm,
    DxItem,
} from 'devextreme-vue/form'

import {
    DxPopup
} from 'devextreme-vue/popup'

export default {
    name: 'Solicitudes',
    components: {
        DxDataGrid,
        DxSelection,
        DxColumn,
        DxEditing,
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
                Nombre: 'Juan',
                Apellido: 'Perez',
                Correo: 'prueba@prueba.com',
                Registro: 123456,
                CUI: 123456798,
                TipoUsuario: 'Jubilado'
            },
            {
                Nombre: 'Pedro',
                Apellido: 'Ramirez',
                Correo: 'prueba1@prueba1.com',
                Registro: 654321,
                CUI: 987654321,
                TipoUsuario: 'Viudo'
            }]
        },

        verSolicitud(e) {
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
