<template>
<div>
    <card title="Usuarios">
        <div class="row p-2" style="display: grid; place-items: center;">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="usuarios" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{visible:false,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'">
                <DxSelection mode="single" />

                <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup" :use-icons="true" :confirmDelete="true" />

                <DxColumn width="auto" data-field="Nombre" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Apellido" data-type="string"  alignment="center" />
                <DxColumn width="auto" data-field="CUI"  data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Partida"  data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Plaza"  data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Registro"  data-type="string" alignment="center" />
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
    DxEditing
    // DxButton
} from 'devextreme-vue/data-grid'

export default {
    name: 'Usuarios',
    components: {
        DxDataGrid,
        DxSelection,
        DxColumn,
        DxEditing
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            usuarios: []
        }
    },
    methods:
    {
        cargarUsuarios()
        {
            this.usuarios = [
                {
                    Nombre: 'Juan',
                    Apellido: 'Perez',
                    CUI: 1234567980000,
                    Partida: 123456,
                    Plaza: 123456,
                    Registro: 123456
                }
            ]
        }
    },
    mounted()
    {
        this.cargarUsuarios()
    }
}
</script>
