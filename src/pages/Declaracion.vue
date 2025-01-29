<template>
<div>
    <card title="Declaración de beneficiarios">
        <form @submit="handleSubmit">
            <DxForm :form-data.sync="formulario" label-mode="floating">
                <DxGroupItem :col-count="3" caption="Datos personales">
                    <!-- Campo para seleccionar el departamento -->
                    <DxItem data-field="Departamento" editor-type="dxLookup" :editor-options="editorOptions" :validation-rules="[{ type: 'required', message: 'El departamento es obligatorio' }]" />

                    <DxItem data-field="Municipio" editor-type="dxLookup" :editor-options="{ dataSource: municipioSeleccionado, displayExpr: 'municipio', valueExpr: 'municipio', searchEnabled: true }" :validation-rules="[{ type: 'required', }]" />
                    <DxItem data-field="FechaNacimiento" editor-type="dxDateBox" :editor-options="{ dateSerializationFormat: 'yyyy-MM-dd' }" :validation-rules="[{ type: 'required' }]">
                        <DxLabel text="Fecha de nacimiento" />
                    </DxItem>
                    <DxItem :col-span="3" data-field="Direccion" editor-type="dxTextBox" :validationRules="[{ type: 'required' }]">
                        <DxLabel text="Dirección" />
                    </DxItem>
                    <DxItem data-field="Telefono" editor-type="dxTextBox" :editor-options="{ mask: '0000 0000', maskChar: '_', inputMode: 'numeric', maxLength: 8, minLength: 8 }" :validationRules="[{ type: 'required' }]">
                        <DxLabel text="Teléfono fijo" />
                    </DxItem>
                    <DxItem data-field="Celular" editor-type="dxTextBox" :editor-options="{ mask: '0000 0000', maskChar: '_', inputMode: 'numeric', maxLength: 8, minLength: 8 }" :validationRules="[{ type: 'required' }]" />
                </DxGroupItem>
                <DxGroupItem :col-count="2" caption="Datos laborales">
                    <DxItem data-field="PuestoDesempeña" editor-type="dxTextBox" :validationRules="[{ type: 'required' }]">
                        <DxLabel text="Puesto que desempeña" />
                    </DxItem>
                    <DxItem data-field="Dependencia" editor-type="dxTextBox" :validationRules="[{ type: 'required' }]" />
                    <DxItem data-field="FechaIngresoUsac" editor-type="dxDateBox" :editor-options="{ dateSerializationFormat: 'yyyy-MM-dd' }" :validation-rules="[{ type: 'required' }]">
                        <DxLabel text="Fecha de ingreso a la USAC" />
                    </DxItem>
                    <DxItem data-field="FechaJubilacion" editor-type="dxDateBox" :editor-options="{ dateSerializationFormat: 'yyyy-MM-dd' }" :validation-rules="[{ type: 'required' }]">
                        <DxLabel text="Fecha de ingreso al plan como jubilado" />
                    </DxItem>
                </DxGroupItem>
                <DxGroupItem caption="Beneficiarios">
                    <DxGroupItem :col-count="3" caption="Pensión por viudez">
                        <DxItem :col-span="2" data-field="NombreViudez" editor-type="dxTextBox" :validationRules="[{ type: 'required' }]">
                            <DxLabel text="Nombres y apellidos completos" />
                        </DxItem>
                        <DxItem data-field="CUIViudez" editor-type="dxTextBox" :editor-options="{ mask: '0000 00000 0000', maskChar: '_', inputMode: 'numeric' }" :validationRules="[{ type: 'required', message: 'El CUI es obligatorio.' }, { type: 'custom', validationCallback: validarDPI, message: 'El DPI no es válido.' }]">
                            <DxLabel text="CUI" />
                        </DxItem>
                        <DxItem data-field="Parentesco" editor-type="dxTextBox" :validationRules="[{ type: 'required' } ]" />
                        <DxItem data-field="Edad" editor-type="dxTextBox" :validationRules="[{ type: 'required' } ]">
                            <DxLabel text="Edad (años)" />
                        </DxItem>
                        <DxItem data-field="FechaNacimientoViudez" editor-type="dxDateBox" :editor-options="{ dateSerializationFormat: 'yyyy-MM-dd' }" :validation-rules="[{ type: 'required' }]">
                            <DxLabel text="Fecha de nacimiento" />
                        </DxItem>
                        <DxItem :col-span="3" data-field="DireccionViudez" editor-type="dxTextBox" :validationRules="[{ type: 'required' }]">
                            <DxLabel text="Dirección" />
                        </DxItem>
                        <DxItem data-field="TelefonoViudez" editor-type="dxTextBox" :editor-options="{ mask: '0000 0000', maskChar: '_', inputMode: 'numeric', maxLength: 8, minLength: 8 }" :validationRules="[{ type: 'required' }]">
                            <DxLabel text="Teléfono fijo" />
                        </DxItem>
                        <DxItem data-field="CelularViudez" editor-type="dxTextBox" :editor-options="{ mask: '0000 0000', maskChar: '_', inputMode: 'numeric', maxLength: 8, minLength: 8 }" :validationRules="[{ type: 'required' }]" />
                    </DxGroupItem>
                    <DxGroupItem caption="Pensión por orfandad">
                        <DxItem template="huerfanos" />
                    </DxGroupItem>
                    <DxGroupItem caption="Seguro de vida">
                        <DxItem template="seguro" />
                    </DxGroupItem>
                </DxGroupItem>

                <template #huerfanos>
                    <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="huerfanos" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{visible:false,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'">

                        <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="row" :use-icons="true" :confirmDelete="true" />

                        <DxColumn width="auto" data-field="Nombres" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="Apellidos" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="Sexo" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="FechaNacimiento" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="Direccion" caption="Dirección" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="Telefono" caption="Teléfono" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="CUI" data-type="string" alignment="center" />
                    </DxDataGrid>
                </template>

                <template #seguro>
                    <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="huerfanos" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{visible:false,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'">

                        <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="row" :use-icons="true" :confirmDelete="true" />

                        <DxColumn width="auto" data-field="Nombres" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="Apellidos" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="CUI" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="Direccion" caption="Dirección" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="Telefono" caption="Teléfono" data-type="string" alignment="center" />
                    </DxDataGrid>
                </template>
            </DxForm>
        </form>
    </card>
</div>
</template>

<script>
import {
    DefaultDxGridConfiguration,
    Departamentos,
    validarDPI
} from './data'

import {
    DxForm,
    DxItem,
    DxGroupItem,
    DxLabel,
    DxButtonItem
} from 'devextreme-vue/form'

import {
    DxDataGrid,
    DxColumn,
    DxEditing,
} from 'devextreme-vue/data-grid'

import 'devextreme-vue/text-area'
import 'devextreme-vue/lookup'
import DataSource from 'devextreme/data/data_source'
import axios from 'axios'

export default {
    name: 'Declaracion',
    components: {
        DxItem,
        DxForm,
        DxGroupItem,
        DxLabel,
        DxButtonItem,
        DxDataGrid,
        DxColumn,
        DxEditing,
    },
    props: {},
    data() {
        return {
            DefaultDxGridConfiguration,
            formulario: {},

            departamentosDataSource: new DataSource({
                store: Departamentos.map((dep) => ({
                    title: dep.title,
                    municipios: dep.mun,
                })),
            }),

            editorOptions: {
                dataSource: this.departamentosDataSource,
                displayExpr: 'title',
                valueExpr: 'title',
                searchEnabled: true,
                dropDownOptions: {
                    hideOnOutsideClick: true,
                    showTitle: false,
                }
            },

            dropDownOptions: {
                hideOnOutsideClick: true,
                showTitle: false,
            },

            municipioSeleccionado: null,

            estadoCivil: [
                'Soltero(a)',
                'Casado(a)',
                'Unido(a)',
            ],

            programas: [
                'Docencia',
                'Administración',
                'Investigación',
                'Extensión'
            ],

            huerfanos: []
        }
    },
    methods: {
        validarDPI,
        handleSubmit(e) {
            // e.preventDefault()
            // if (this.tipo == 1) {
            //     this.guardarPublicacion()
            // } else if (this.tipo == 2) {
            //     this.editarPublicacion()
            // }

        },

    },
    watch: {
        "formulario.Departamento"(nuevo) {
            const dep = this.departamentos.find((d) => d.title === nuevo);
            this.municipioSeleccionado = dep ?
                dep.mun.map((m) => ({
                    municipio: m
                })) // Crear objetos para el lookup
                :
                [];
            this.formulario.Municipio = null; // Resetear municipio
        }
    },
    beforeMount() {},
    mounted() {
        // this.cargarPublicacion()
    }
}
</script>
