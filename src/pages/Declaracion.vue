<template>
<div>
    <card title="Declaración de beneficiarios">
        <form @submit="handleSubmit">
            <DxForm :ref="formularioDependencia" :form-data.sync="formulario" label-mode="floating">
                <DxGroupItem :col-count="3" caption="Datos personales">
                    <!-- Campo para seleccionar el departamento -->
                    <DxItem data-field="Departamento" editor-type="dxSelectBox" :editor-options="{ width: 'auto', searchEnabled: true, items: departamentos,  displayExpr: 'Nombre', valueExpr: 'Nombre', onValueChanged: seleccionDepartamento }" :validation-rules="[{ type: 'required', message: 'El departamento es obligatorio' }]">
                        <DxLabel text="Departamento nacimiento" />
                    </DxItem>

                    <DxItem data-field="Municipio" editor-type="dxSelectBox" :editor-options="{ dataSource: municipios, displayExpr: 'Nombre', valueExpr: 'Nombre', searchEnabled: true, readOnly: departamentoSeleccionado == null }" :validation-rules="[{ type: 'required', }]">
                        <DxLabel text="Municipio nacimiento" />
                    </DxItem>
                    <DxItem data-field="FechaNacimiento" editor-type="dxDateBox" :editor-options="editorOptionsFecha" :validation-rules="[{ type: 'required' }]">
                        <DxLabel text="Fecha de nacimiento" />
                    </DxItem>
                    <DxItem :col-span="3" data-field="Direccion" editor-type="dxTextBox" :validationRules="[{ type: 'required' }]">
                        <DxLabel text="Dirección" />
                    </DxItem>
                    <DxItem data-field="Telefono" editor-type="dxTextBox" :editor-options="{ mask: '0000 0000', maskChar: '_', inputMode: 'numeric', maxLength: 8, minLength: 8 }" :validationRules="[{ type: 'custom', validationCallback: validarTelefonoFijo, message: 'El número de teléfono fijo debe iniciar con 2, 6 o 7 y tener 8 dígitos' }]">
                        <DxLabel text="Teléfono fijo" />
                    </DxItem>
                    <DxItem data-field="Celular" editor-type="dxTextBox" :editor-options="{ mask: '0000 0000', maskChar: '_', inputMode: 'numeric', maxLength: 8, minLength: 8 }" :validationRules="[{ type: 'required' }, { type: 'custom', validationCallback: validarTelefonoCelular, message: 'El número de celular debe iniciar con 3, 4 o 5 y tener 8 dígitos' }]" />
                    <DxEmptyItem />
                    <DxItem data-field="EstadoCivil" :col-span="3" editor-type="dxRadioGroup" :editor-options="{ width: 'auto', layout: 'horizontal', searchEnabled: true, items: estadoCivil,  displayExpr: 'Estado', valueExpr: 'Valor' }" :validation-rules="[{ type: 'required' }]">
                        <DxLabel text="Estado civil" />
                    </DxItem>
                </DxGroupItem>
                <DxGroupItem :col-count="2" caption="Datos laborales">
                    <DxItem data-field="PuestoDesempeña" editor-type="dxTextBox" :validationRules="[{ type: 'required' }]">
                        <DxLabel text="Puesto que desempeña" />
                    </DxItem>
                    <DxItem data-field="Dependencia" editor-type="dxTextBox" :validationRules="[{ type: 'required' }]" />
                    <DxItem data-field="FechaIngresoUsac" editor-type="dxDateBox" :editor-options="editorOptionsFecha" :validation-rules="[{ type: 'required' }]">
                        <DxLabel text="Fecha de ingreso a la USAC" />
                    </DxItem>
                    <DxItem data-field="FechaJubilacion" editor-type="dxDateBox" :editor-options="editorOptionsFecha">
                        <DxLabel text="Fecha de ingreso al plan como jubilado" />
                    </DxItem>
                    <DxItem :col-span="2" data-field="Programa" editor-type="dxRadioGroup" :editor-options="{ width: 'auto', layout: 'horizontal', searchEnabled: true, items: programas,  displayExpr: 'Programa', valueExpr: 'Valor' }" :validation-rules="[{ type: 'required' }]" />
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
                        <DxItem data-field="Edad" editor-type="dxNumberBox" :editor-options="{ showSpinButtons: true, max: 120, min: 1 }" :validationRules="[{ type: 'required' } ]" :value="null">
                            <DxLabel text="Edad (años)" />
                        </DxItem>
                        <DxItem data-field="FechaNacimientoViudez" editor-type="dxDateBox" :editor-options="editorOptionsFecha" :validation-rules="[{ type: 'required' }]">
                            <DxLabel text="Fecha de nacimiento" />
                        </DxItem>

                        <DxItem :col-span="3" data-field="DireccionViudez" editor-type="dxTextBox" :validationRules="[{ type: 'required' }]">
                            <DxLabel text="Dirección" />
                        </DxItem>
                        <DxItem data-field="TelefonoViudez" editor-type="dxTextBox" :editor-options="{ mask: '0000 0000', maskChar: '_', inputMode: 'numeric', maxLength: 8, minLength: 8 }" :validationRules="[{ type: 'required' }, { type: 'custom', validationCallback: validarTelefonoFijo, message: 'El número de teléfono fijo debe iniciar con 2, 6 o 7 y tener 8 dígitos' }]">
                            <DxLabel text="Teléfono fijo" />
                        </DxItem>
                        <DxItem data-field="CelularViudez" editor-type="dxTextBox" :editor-options="{ mask: '0000 0000', maskChar: '_', inputMode: 'numeric', maxLength: 8, minLength: 8 }" :validationRules="[{ type: 'required' }, { type: 'custom', validationCallback: validarTelefonoCelular, message: 'El número de celular debe iniciar con 3, 4 o 5 y tener 8 dígitos' }]">
                            <DxLabel text="Celular" />
                        </DxItem>
                        <DxItem data-field="CorreoViudez" editor-type="dxTextBox" :validationRules="[{ type: 'required' }, { type: 'email', message: 'Correo no válido.' }]" >
                            <DxLabel text="Correo electrónico" />
                        </DxItem>
                    </DxGroupItem>
                    <!-- <DxButtonItem :button-options="{ text: 'Guardar', type: 'default', onClick: handleSubmit }" class="floating-button-container" /> -->
                    <DxGroupItem caption="Pensión por orfandad">
                        <DxItem template="huerfanos" />
                    </DxGroupItem>
                    <DxGroupItem caption="Seguro de vida">
                        <DxItem template="seguro" />
                    </DxGroupItem>
                </DxGroupItem>

                <template #huerfanos>
                    <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="huerfanos" :paging="{enabled: true}" :filter-sync-enabled="true" :headerFilter="{visible:false,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'" @editor-preparing="editorPreparing">

                        <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="row" :use-icons="true" :confirmDelete="true" />

                        <DxColumn width="auto" data-field="Nombres" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="Apellidos" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="Sexo" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="FechaNacimiento" caption="Fecha nacimiento" data-type="string" alignment="center" />
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
                        <DxColumn width="200px" data-field="CUI" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="Direccion" caption="Dirección" data-type="string" alignment="center" />
                        <DxColumn width="auto" data-field="Telefono" caption="Teléfono" data-type="string" alignment="center" />
                    </DxDataGrid>
                </template>
            </DxForm>
            <div class="p-2 fixed1">
                <DxButton text="Guardar" icon="save" type="success" :use-submit-behavior="true" />
            </div>
        </form>

    </card>
</div>
</template>

<script>
import {
    DefaultDxGridConfiguration,
    Departamentos,
    validarDPI,
    validarTelefonoFijo,
    validarTelefonoCelular
} from './data'

import {
    DxForm,
    DxItem,
    DxGroupItem,
    DxLabel,
    DxButtonItem,
    DxEmptyItem
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
import DxButton from "devextreme-vue/button"

const formularioDependencia = 'formularioDependencia'

export default {
    name: 'Declaracion',
    components: {
        DxItem,
        DxForm,
        DxGroupItem,
        DxLabel,
        DxButtonItem,
        DxEmptyItem,
        DxButton,
        DxDataGrid,
        DxColumn,
        DxEditing,
    },
    props: {},
    data() {
        return {
            DefaultDxGridConfiguration,
            formularioDependencia,
            formulario: {
                Departamento: null,
                Municipio: null
            },

            departamentos: Departamentos.map((dep) => ({
                Nombre: dep.title,
                Municipios: dep.mun,
                Edad: null
            })),

            municipios: [],

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

            editorOptionsFecha: {
                dateSerializationFormat: 'yyyy-MM-dd',
                max: new Date()
            },

            dropDownOptions: {
                hideOnOutsideClick: true,
                showTitle: false,
            },

            guardarButton: {
                text: 'Guardar',
                type: 'success',
                icon: 'save',
                useSubmitBehavior: true,
            },

            departamentoSeleccionado: null,
            municipioSeleccionado: null,

            estadoCivil: [{
                    Estado: 'Soltero(a)',
                    Valor: 1
                },
                {
                    Estado: 'Casado(a)',
                    Valor: 2
                },
                {
                    Estado: 'Unido(a)',
                    Valor: 3
                },
            ],

            programas: [{
                    Programa: 'Docencia',
                    Valor: 1
                },
                {
                    Programa: 'Administración',
                    Valor: 2
                },
                {
                    Programa: 'Investigación',
                    Valor: 3
                },
                {
                    Programa: 'Extensión',
                    Valor: 4
                }
            ],

            huerfanos: []
        }
    },
    methods: {
        validarDPI,
        validarTelefonoFijo,
        validarTelefonoCelular,
        handleSubmit(e) {
            e.preventDefault()
            if (this.formBeneficiariosInstance.validate().isValid) {
                this.generarPDF()
            }

        },

        seleccionDepartamento(e) {
            const departamento = e.value; // Obtiene el valor seleccionado
            const depSeleccionado = this.departamentos.find((d) => d.Nombre === departamento);
            console.log(depSeleccionado)

            if (depSeleccionado) {
                // Actualiza los municipios basados en el departamento seleccionado
                this.municipios = depSeleccionado.Municipios.map((mun) => ({
                    Nombre: mun
                }))
                this.departamentoSeleccionado = departamento // Marca el departamento como seleccionado
                this.formulario.Municipio = null // Resetea el campo Municipio

            } else {
                // Limpia los municipios si no hay departamento seleccionado
                this.municipios = [];
                this.departamentoSeleccionado = null;
                this.formulario.Municipio = null;
            }

        },

        registroDeclaracion() {

        },

        generarPDF() {
            axios.post(
                    'http://localhost:3000/api/generate-pdf', {
                        Registro: '201404006',
                        Nombres: 'Oscar Alejandro',
                        Apellidos: 'Rodríguez Calderón',
                        Departamento: this.formulario.Departamento,
                        Municipio: this.formulario.Municipio,
                        FechaNacimiento: this.formulario.FechaNacimiento,
                        Direccion: this.formulario.Direccion,
                        CUI: '3016860170101',
                        Telefono: this.formulario.Telefono,
                        Celular: this.formulario.Celular,
                        CorreoElectronico: 'prueba@prueba.com',
                        EstadoCivil: this.formulario.EstadoCivil,
                        Sexo: 1,
                        Puesto: this.formulario.PuestoDesempeña,
                        Dependencia: this.formulario.Dependencia,
                        FechaIngresoUsac: this.formulario.FechaIngresoUsac,
                        FechaJubilacion: this.formulario.FechaJubilacion,
                        Programa: this.formulario.Programa,
                        NombreViudez: this.formulario.NombreViudez,
                        CUIViudez: this.formulario.CUIViudez,
                        Parentesco: this.formulario.Parentesco,
                        Edad: this.formulario.Edad,
                        FechaNacimientoViudez: this.formulario.FechaNacimientoViudez,
                        DireccionViudez: this.formulario.DireccionViudez,
                        TelefonoViudez: this.formulario.TelefonoViudez,
                        CelularViudez: this.formulario.CelularViudez,
                        CorreoViudez: this.formulario.CorreoViudez
                    },
                    {
                        responseType: 'arraybuffer',
                    } // Configuración de Axios
                )
                .then(resp => {
                    console.log(resp)
                    if (resp.status === 200) {
                        // Convertir el array buffer a un Blob
                        const blob = new Blob([resp.data], {
                            type: 'application/pdf'
                        });

                        // Crear una URL para el Blob
                        const url = window.URL.createObjectURL(blob);

                        // Crear un enlace temporal para descargar el archivo
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'reporte.pdf'); // Nombre del archivo
                        document.body.appendChild(link);
                        link.click();

                        // Limpiar el DOM y liberar memoria
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                    } else {
                        console.error(`Error al generar el PDF: ${resp.statusText}`);
                    }
                })
                .catch(error => {
                    console.error('Error al generar el PDF:', error);
                });
        },
        editorPreparing(e) {
            if (e.dataField === "CUI" && e.parentType === "dataRow") {
                e.editorOptions.onFocusOut = () => {
                    const value = e.editorOptions.value;

                    if (!this.validarDPI(e.editorOptions)) {
                        alert("El CUI ingresado no es válido. Por favor, corrígelo.");
                        e.component.cellValue(e.row.rowIndex, "CUI", null); // Limpia el valor no válido
                    }
                };
            }
        }
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
    },
    computed: {
        formBeneficiariosInstance: function () {
            return this.$refs[formularioDependencia].instance;
        },
    }
}
</script>

<style>
.fixed1 {
    position: fixed !important;
    bottom: 35px;
    padding: 3px;
    z-index: 9999 !important;
}
</style>
