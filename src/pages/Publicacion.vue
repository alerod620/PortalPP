<template>
<div>
    <card :title="titulo">
        <form @submit="handleSubmit">
            <DxForm :form-data.sync="formulario">
                <DxGroupItem :col-count="3">
                    <DxItemForm data-field="Titulo" editor-type="dxTextBox" type="required" :validation-rules="[ { type: 'required', message: 'El título es obligatorio' } ]" />
                    <DxItemForm data-field="FechaInicial" editor-type="dxDateBox" :validation-rules="[ { type: 'required', message: 'La fecha inicial es obligatoria' } ]" />
                    <DxItemForm data-field="FechaFin" editor-type="dxDateBox" :validation-rules="[ { type: 'required', message: 'La fecha final es obligatoria' } ]" />
                </DxGroupItem>
                <DxGroupItem :col-count="1">
                    <DxItemForm template="editor" />
                    <!-- <DxItemForm data-field="Contenido" :editor-options="editorOptionsHTML">
                        <DxLabel :visible="false" />
                    </DxItemForm> -->
                </DxGroupItem>

                <template #editor>
                    <DxHtmlEditor class="mt-4" value-type="html" :value.sync="contenidoPublicacion" :read-only="tipo == 3">
                        <DxToolbar :multiline="true" v-if="tipo == 1">
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
                </template>
                <DxGroupItem :col-count="2">
                    <DxButtonItem :button-options="guardarButtonOptions" horizontal-alignment="center" verical-alignment="center" />
                    <DxButtonItem :button-options="cancelarButtonOptions" horizontal-alignment="center" verical-alignment="center" />
                </DxGroupItem>
            </DxForm>

            <!-- <vs-button class="m-2 w-full xl:w-1/3" style="width: 120px" color="success" type="filled" @click="guardarPublicacion">
                <font-awesome-icon :icon="['fas', 'save']" class="fa mr-1" />
                <span>Guardar</span>
            </vs-button>
            <vs-button class="m-2 w-full xl:w-1/3" style="width: 120px" color="danger" type="filled" @click.native="cancelarAccion">
                <font-awesome-icon :icon="['fas', 'xmark']" class="fa mr-1" />
                <span>Cancelar</span>
            </vs-button> -->
        </form>
    </card>
    <DxPopup :show-title="true" height="auto" :visible.sync="popupVisible" title="Markup" :show-close-button="true">
        {{ contenidoPublicacion }}
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

import {
    DxForm,
    DxItem as DxItemForm,
    DxGroupItem,
    DxLabel,
    DxButtonItem
} from 'devextreme-vue/form'

import 'devextreme-vue/text-area'
import axios from 'axios'

export default {
    name: 'Modulos',
    components: {
        DxHtmlEditor,
        DxToolbar,
        DxMediaResizing,
        DxImageUpload,
        DxItem,
        DxPopup,
        DxForm,
        DxItemForm,
        DxGroupItem,
        DxLabel,
        DxButtonItem
    },
    props: {
        publicacionValue: null,
        tipo: null // 1 = crear publicacion, 2 = edicion, 3 = vista
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            publicacion: null,
            formulario: {},

            sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
            fontValues: ['Arial', 'Georgia', 'Tahoma', 'Times New Roman', 'Verdana'],
            headerValues: [false, 1, 2, 3, 4, 5],

            editorOptionsHTML: {
                value: "",
                valueType: "html",
                toolbar: {
                    items: [
                        "undo", "redo", "separator",
                        "bold", "italic", "underline", "separator",
                        "alignLeft", "alignCenter", "alignRight", "separator",
                        "orderedList", "bulletList", "separator",
                        "color", "background", "separator",
                        "link", "image", "separator",
                        "clear", "codeBlock", "blockquote"
                    ]
                },
                height: 300
            },

            toolbarButtonOptions: {
                text: 'Show markup',
                stylingMode: 'text',
                onClick: () => {
                    this.popupVisible = true;
                }
            },

            contenidoPublicacion: '',

            titulo: '',
            popupVisible: false,

            guardarButtonOptions: {
                text: 'Guardar',
                type: 'success',
                icon: 'save',
                useSubmitBehavior: true,
            },

            cancelarButtonOptions: {
                text: 'Cancelar',
                type: 'danger',
                icon: 'close',
            },
        }
    },
    methods: {
        cancelarAccion() {
            this.$emit('cancelar', true)
        },
        guardarPublicacion() {
            console.log(this.formulario)
            // axios.post('http://localhost:3000/api/Publicaciones', {
            //         Opcion: 2,
            //         Titulo: this.formulario.Titulo,
            //         Contenido: this.contenidoPublicacion,

            //     })
            //     .then(resp => {
            //         this.publicacion = resp.data
            //         // if (resp.data.length > 0) {
            //         //     this.solicitudes = resp.data
            //         // }
            //     })
        },

        handleSubmit(e) {
            e.preventDefault()
            this.guardarPublicacion()
        },

    },
    beforeMount() {
        if (this.tipo == 1) {
            this.titulo = 'Crear nueva publicación'
        } else if (this.tipo == 2) {
            this.titulo = 'Edición publicación'
        } else if (this.tipo == 3) {
            this.titulo = 'Ver publicación'
        }
    },
    mounted() {
        // this.cargarPublicacion()
    }
}
</script>

<style>
.publicaciones {
    border: solid !important;
    border-color: black;
}

.displayTail {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
