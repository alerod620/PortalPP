<template>
<div>
    <card title="Usuarios">
        <div class="row p-2">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="usuarios" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{visible:false,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'">
                <DxSelection mode="single" />

                <DxColumn :width="200" data-field="Nombre" data-type="string" alignment="center" />
                <DxColumn :width="200" data-field="Apellido" data-type="string"  alignment="center" />
                <DxColumn :width="200" data-field="CUI"  data-type="string" alignment="center" />
                <DxColumn :width="100" data-field="Partida"  data-type="string" alignment="center" />
                <DxColumn :width="100" data-field="Plaza"  data-type="string" alignment="center" />
                <DxColumn :width="100" data-field="Registro"  data-type="string" alignment="center" />
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
    // DxButton
} from 'devextreme-vue/data-grid'

export default {
    name: 'Usuarios',
    components: {
        DxDataGrid,
        DxSelection,
        DxColumn,
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
