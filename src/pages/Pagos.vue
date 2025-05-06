<template>
<div>
    <card title="Pagos">
        <div class="row p-2">
            <DxDataGrid :ref="dataGridPagos" v-bind="DefaultDxGridConfiguration" :data-source="historial" :paging="{ enabled: true, pageSize: 10 }" :filter-sync-enabled="true" :headerFilter="{ visible:false,allowSearch: true }" :searchPanel="{ visible: true }" :height="'100%'" :width="'100%'" @option-changed="guardarPaginaActual">

                <DxToolbar>
                    <DxItem location="before" template="CertificacionNominal" />
                    <DxItem name="searchPanel" location="after" />
                </DxToolbar>
                <DxSelection mode="single" />

                <DxColumn width="100px" data-field="correlativo" caption="Correleativo" data-type="string" alignment="center" />
                <DxColumn width="100%" data-field="name" caption="Concepto" data-type="string" alignment="center" />
                <DxColumn width="100px" data-field="fecha_pago" caption="Fecha pago" data-type="string" alignment="center" />
                <DxColumn width="100px" data-field="month" caption="Mes" data-type="string" alignment="center" />
                <DxColumn width="100px" data-field="year" caption="Año" data-type="string" alignment="center" />
                <DxColumn width="150px" data-field="acreditamiento" caption="Banco" data-type="string" alignment="center" />
                <DxColumn width="100px" data-field="liquido" caption="Líquido" data-type="string" alignment="center" />

                <!-- <DxColumn :width="50" type="buttons" :buttons="[
                {
                    icon:'fas fa-eye',
                    hint:'Ver',
                    onClick: (obj)=>{
                        this.cargarDetalle(obj.row.rowIndex)
                        this.verDetalle = true
                    }
                }
            ]" :allow-reordering="false" /> -->

                <DxColumn :width="100" alignment="center" cell-template="reporte" />

                <template #reporte="{data: info}">
                    <div>
                        <DxButton width="30px" height="30px" type="default" styling-mode="contained" class="botonReporte mr-2" @click="cargarDetalle(info.data)" hint="Detalle">
                            <font-awesome-icon :icon="['fas', 'eye']" style="font-size: 16px; " />
                        </DxButton>
                        <DxButton width="30px" height="30px" type="danger" styling-mode="contained" class="botonReporte" @click="descargarCertificacionDetalle(info.data)" hint="Certificación detallada">
                            <font-awesome-icon :icon="['fas', 'file-pdf']" style="font-size: 20px;" />
                        </DxButton>
                    </div>

                </template>

                <template #CertificacionNominal>
                    <div>
                        <DxButton type="success" styling-mode="contained" @click="descargarCertificacionNominal">
                            <font-awesome-icon :icon="['fas', 'file-pdf']" style="font-size: 18px; vertical-align: middle" />
                            <span>Certificación nominal</span>
                        </DxButton>
                    </div>
                </template>
            </DxDataGrid>
        </div>
    </card>

    <DxPopup width="50%" height="auto" :show-title="true" :drag-enabled="true" :hide-on-outside-click="true" :showCloseButton="true" title="Detalle pago" :visible.sync="verDetalle">
        <DxDataGrid :ref="dataGridDetalle" v-bind="DefaultDxGridConfiguration" :data-source="detalleActivo" :paging="{enabled: true, pageSize: 10}" :filter-sync-enabled="true" :headerFilter="{visible:false,allowSearch:true}" :searchPanel="{ visible: false }" :height="'100%'" :width="'100%'">
            <DxSelection mode="single" />

            <DxColumn width="100px" data-field="iddetallenomina" caption="ID" data-type="string" alignment="center" />
            <DxColumn width="100%" data-field="nombre" caption="Concepto" data-type="string" alignment="center" />
            <DxColumn width="100px" data-field="tipo" caption="Tipo" data-type="string" alignment="center" />
            <DxColumn width="150px" data-field="monto" caption="Monto" data-type="string" alignment="center" :customize-text="textoDinero" />
        </DxDataGrid>
    </DxPopup>
</div>
</template>

<script>
const dataGridPagos = 'dataGridPagos'
const dataGridDetalle = 'dataGridDetalle'

import {
    DefaultDxGridConfiguration,
    textoDinero
} from './data'
import {
    DxDataGrid,
    DxSelection,
    DxColumn,
    DxEditing,
    DxForm,
    DxToolbar,
    DxItem
    // DxButton
} from 'devextreme-vue/data-grid'
import DxButton from "devextreme-vue/button"
import DxPopup from 'devextreme-vue/popup';
import axios from 'axios'

export default {
    name: 'Usuarios',
    components: {
        DxDataGrid,
        DxSelection,
        DxColumn,
        DxEditing,
        DxForm,
        DxToolbar,
        DxButton,
        DxItem,
        DxPopup,
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            dataGridPagos,
            dataGridDetalle,
            historial: [],
            verDetalle: false,
            detalleActivo: [],
            paginaActual: 0 // Variable para manejar la página del datagrid de pagos, ya que al momento de levantar el detalle se reinicia
        }
    },
    props: {
        Registro: null,
        usoComponente: false // Variable para indicar que se está usando la vista desde otro componente
    },
    methods: {
        textoDinero,
        guardarPaginaActual(e) {
            if (e.fullName === 'paging.pageIndex') {
                this.paginaActual = e.value
            }
        },
        async cargarLibros() {
            await axios.post('http://localhost:3000/api/LibroSalarios', {
                    partida: 4303,
                    plaza: 1340,
                    registro: 980834,
                    busqueda: "ppr"
                })
                .then(resp => {
                    if (resp.data.data.historial.length > 0) {
                        this.historial = resp.data.data.historial
                    }
                })
        },

        async cargarDetalle(e) {
            await axios.post('http://localhost:3000/api/LibroSalariosDetalle', {
                    idpersona: 3909,
                    idnomina: e.idnomina,
                    idtiponomina: 1
                })
                .then(resp => {
                    this.detalleActivo = []
                    if (resp.data.data.detalle_pago.length > 0) {
                        this.detalleActivo = resp.data.data.detalle_pago
                    }
                }, 100);
            this.verDetalle = true
            this.$nextTick(() => {
                this.gridPagos.pageIndex(this.paginaActual)
            })
        },

        async descargarCertificacionNominal() {
            await axios.post('http://localhost:3000/api/CertificacionNominal', {
                    idpersona: 3909,
                    fileType: "pdf"
                }, {
                    responseType: 'arraybuffer',
                })
                .then(resp => {
                    if (resp.status === 200) {
                        const blob = new Blob([resp.data], {
                            type: 'application/pdf'
                        });

                        // Crear una URL para el Blob
                        const url = window.URL.createObjectURL(blob);

                        // Crear un enlace temporal para descargar el archivo
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'CertificacionNominal.pdf'); // Nombre del archivo
                        document.body.appendChild(link);
                        link.click();

                        // Limpiar el DOM y liberar memoria
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                    } else {
                        console.error(`Error al generar el PDF: ${resp.statusText}`);
                    }
                })
        },

        async descargarCertificacionDetalle(e) {
            await axios.post('http://localhost:3000/api/CertificacionDetallada', {
                    idpersona: e.persona_idpersona,
                    idnomina: e.idnomina,
                    idtiponomina: e.tiponomina_idtiponomina,
                    fileType: "pdf",
                    certificacion_prestaciones: false
                }, {
                    responseType: 'arraybuffer',
                })
                .then(resp => {
                    if (resp.status === 200) {
                        const blob = new Blob([resp.data], {
                            type: 'application/pdf'
                        });

                        // Crear una URL para el Blob
                        const url = window.URL.createObjectURL(blob);

                        // Crear un enlace temporal para descargar el archivo
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'CertificacionNominal.pdf'); // Nombre del archivo
                        document.body.appendChild(link);
                        link.click();

                        // Limpiar el DOM y liberar memoria
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                    } else {
                        console.error(`Error al generar el PDF: ${resp.statusText}`);
                    }
                })
        },
    },
    mounted() {
        this.cargarLibros()
    },
    watch: {
        verDetalle(val) {
            if (val == false) {
                this.$nextTick(() => {
                    this.gridPagos.pageIndex(this.paginaActual)
                })
            }
        }
    },
    computed: {
        gridPagos: function () {
            return this.$refs[dataGridPagos].instance;
        },

        gridDetalle: function () {
            return this.$refs[dataGridDetalle].instance;
        },
    }
}
</script>

<style>
.botonReporte .dx-button-content {
    padding: 0px !important;
}
</style>
