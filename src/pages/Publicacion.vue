<template>
<div>
    <card :title="edicion ? 'Editar publicacion' : 'Ver publicación'">
        <DxHtmlEditor value-type="html" :value.sync="valorPublicacion" :read-only="!edicion">
            <DxToolbar :multiline="true" v-if="edicion">
                <DxItem name="undo" />
                <DxItem name="redo" />
                <DxItem name="separator" />
                <DxItem name="size" :accepted-values="sizeValues" />
                <DxItem name="font" :accepted-values="fontValues" />
                <DxItem name="separator" />
                <DxItem name="bold" />
                <DxItem name="italic" />
                <DxItem name="strike" />
                <DxItem name="underline" />
                <DxItem name="separator" />
                <DxItem name="alignLeft" />
                <DxItem name="alignCenter" />
                <DxItem name="alignRight" />
                <DxItem name="alignJustify" />
                <DxItem name="separator" />
                <DxItem name="orderedList" />
                <DxItem name="bulletList" />
                <DxItem name="separator" />
                <DxItem name="header" :accepted-values="headerValues" />
                <DxItem name="separator" />
                <DxItem name="color" />
                <DxItem name="background" />
                <DxItem name="separator" />
                <DxItem name="link" />
                <DxItem name="image" />
                <DxItem name="separator" />
                <DxItem name="clear" />
                <DxItem name="codeBlock" />
                <DxItem name="blockquote" />
                <DxItem name="separator" />
                <DxItem :options="toolbarButtonOptions" widget="dxButton" />
            </DxToolbar>
        </DxHtmlEditor>
        <vs-button class="m-2 botonesEditarPublicaciones w-full xl:w-1/3" color="primary" type="filled" @click.native="verPublicacion">
            <span>Ver</span>
        </vs-button>
        <vs-button class="m-2 botonesEditarPublicaciones w-full xl:w-1/3" color="danger" type="filled" @click.native="cancelarAccion">
            <span>Cancelar</span>
        </vs-button>
    </card>
    <DxPopup :show-title="true" height="auto" :visible.sync="popupVisible" title="Markup" :show-close-button="true">
        {{ valorPublicacion }}
    </DxPopup>
</div>
</template>

<script>
import {
    DefaultDxGridConfiguration
} from './data'
import {
    DxPopup
} from 'devextreme-vue/popup';

import {
    DxHtmlEditor,
    DxToolbar,
    DxMediaResizing,
    DxImageUpload,
    DxItem,
} from 'devextreme-vue/html-editor';

import 'devextreme-vue/text-area'

export default {
    name: 'Modulos',
    components: {
        DxHtmlEditor,
        DxToolbar,
        DxMediaResizing,
        DxImageUpload,
        DxItem,
        DxPopup
    },
    props: {
        publicacionValue: null,
        edicion: null // true = edicion, false = vista
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            solicitudes: [],
            moduloActivo: {},

            visualizarModulo: false,

            sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
            fontValues: ['Arial', 'Georgia', 'Tahoma', 'Times New Roman', 'Verdana'],
            headerValues: [false, 1, 2, 3, 4, 5],

            popupVisible: false,

            toolbarButtonOptions: {
                text: 'Show markup',
                stylingMode: 'text',
                onClick: () => {
                    this.popupVisible = true;
                }
            },

            valorPublicacion: '<p><strong>fdsfdas</strong></p><p><br></p><p style="text-align: center;"><strong>fasdfsa</strong></p><p style="text-align: left;"><strong><u>fdsfasaf</u></strong></p>'
        }
    },
    methods: {
        verPublicacion() {
            console.log(this.valorPublicacion)
        },
        cancelarAccion() {
            this.$emit('cancelar', true)
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

<style>
.publicaciones {
    border: solid !important;
    border-color: black;
}

.botonesEditarPublicaciones {
    max-width: 80px !important;
}

.displayTail {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
