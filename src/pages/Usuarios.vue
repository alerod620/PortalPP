<template>
<div>
    <card title="Usuarios">
        <div class="row p-2" style="display: grid; place-items: center;">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="usuarios" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{visible:false,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'">
                <DxSelection mode="single" />

                <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup" :use-icons="true" :confirmDelete="true">
                    <DxPopup :width="'60%'" height="auto" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Usuario" :showCloseButton="true" />
                </DxEditing>

                <DxColumn width="auto" data-field="Nombre" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Apellido" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="CUI" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Partida" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Plaza" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Registro" data-type="string" alignment="center" />
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
    DxPopup,
    DxForm,
    // DxButton
} from 'devextreme-vue/data-grid'
import axios from 'axios'

export default {
    name: 'Usuarios',
    components: {
        DxDataGrid,
        DxSelection,
        DxColumn,
        DxEditing,
        DxPopup,
        DxForm,
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            usuarios: []
        }
    },
    props: {
        Registro: null
    },
    methods: {
        cargarUsuarios() {
            axios({
                    method: 'post',
                    url: 'http://localhost:3000/api/Usuarios',
                    data: {
                        Opcion: 1,
                    },
                })
                .then((resp) => {
                    if (resp.data.length > 0) {
                        this.usuarios = resp.data
                    }
                });

            // this.usuarios = [{
            //         Nombre: 'Juan',
            //         Apellido: 'Perez',
            //         CUI: 1234567980000,
            //         Partida: 123456,
            //         Plaza: 123456,
            //         Registro: 123456
            //     },
            //     {
            //         Nombre: 'Pedro',
            //         Apellido: 'Sanchez',
            //         CUI: 9876543210000,
            //         Partida: 654321,
            //         Plaza: 321654,
            //         Registro: 456254
            //     },
            //     {
            //         Nombre: 'Pablo',
            //         Apellido: 'Trejo',
            //         CUI: 5748464354313,
            //         Partida: 579548,
            //         Plaza: 6584897,
            //         Registro: 654712
            //     }
            // ]
        }
    },
    mounted() {
        this.cargarUsuarios()
    }
}
</script>
