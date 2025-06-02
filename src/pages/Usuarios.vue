<template>
<div>
    <card title="Usuarios">
        <div class="row p-2" style="display: grid; place-items: center;">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="usuarios" :paging="{enabled: true, pageSize: 10}" :filter-sync-enabled="true" :headerFilter="{visible:false,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'" @row-dbl-click="seleccionarUsuario">
                <DxSelection mode="single" />

                <!-- <DxEditing :allow-updating="true" :allow-adding="false" :allow-deleting="true" mode="popup" :use-icons="true" :confirmDelete="true">
                    <DxPopup :width="'60%'" height="auto" :show-title="true" :full-screen="false" :hide-on-outside-click="false" title="Usuario" :showCloseButton="true" />
                </DxEditing> -->

                <DxColumn width="auto" data-field="idpersona" caption="ID" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="nombres" caption="Nombres" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="apellidos" caption="Apellidos" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="registro" caption="Registro" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="partida" caption="Partida" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="plaza" caption="Plaza" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="numero_dpi" caption="DPI" data-type="string" alignment="center" />
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
            usuarios: [],
        }
    },
    props: {
        Registro: null,
        usoComponente: false // Variable para indicar que se está usando la vista desde otro componente
    },
    methods: {
        cargarUsuarios() {
            axios({
                    method: 'post',
                    url: 'http://localhost:3000/api/ObtenerPersonas',
                    data: {
                        Opcion: 2,
                    },
                })
                .then((resp) => {
                    if (resp.data.length > 0) {
                        this.usuarios = resp.data
                    }
                });
        },

        seleccionarUsuario(e) {
            if (this.usoComponente) {
                this.$emit('usuario', e.data)
            }
        }
    },
    mounted() {
        this.cargarUsuarios()
    }
}
</script>
