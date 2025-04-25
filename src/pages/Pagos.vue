<template>
<div>
    <card>
        <div class="row p-2" style="display: grid; place-items: center;">
            <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="historial" :paging="{enabled: true, pageSize: 10}" :filter-sync-enabled="true" :headerFilter="{visible:false,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'">
                
                <DxToolbar>
                    <DxItem location="before" template="CertificacionNominal" />
                    <DxItem name="searchPanel" location="after" />
                </DxToolbar>
                <DxSelection mode="single" />

                <DxColumn width="100px" data-field="correlativo" caption="Correleativo" data-type="string" alignment="center" />
                <DxColumn width="100%" data-field="name" caption="Concepto" data-type="string" alignment="center" />
                <DxColumn width="100px" data-field="fecha_pago" caption="Fecha pago" data-type="string" alignment="center" />
                <DxColumn width="150px" data-field="acreditamiento" caption="Banco" data-type="string" alignment="center" />
                <DxColumn width="100px" data-field="nominal" caption="Nominal" data-type="string" alignment="center" />
                <DxColumn width="100px" data-field="liquido" caption="Líquido" data-type="string" alignment="center" />

                <DxColumn :width="50" alignment="center" cell-template="reporte" />

                <template #reporte="{data: info}">
                    <DxButton width="30px" height="30px" type="danger" styling-mode="contained" class="botonReporte" @click="descargarCertificacionDetalle(info.data)" hint="Certificación detallada">
                        <font-awesome-icon :icon="['fas', 'file-pdf']" style="font-size: 20px;" />
                    </DxButton>
                </template>

                <template #CertificacionNominal>
                    <div>
                        <DxButton type="success" styling-mode="contained" @click="descargarCertificacionNominal">
                            <font-awesome-icon :icon="['fas', 'file-pdf']" style="font-size: 18px; vertical-align: middle" />
                            <span>Certificación nominal</span>
                        </DxButton>
                    </div>
                </template>
                <!-- <DxColumn width="auto" data-field="Correo" data-type="string" alignment="center" /> -->
                <!-- <DxColumn width="auto" data-field="Registro" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Partida" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="Plaza" data-type="string" alignment="center" />
                <DxColumn width="auto" data-field="DPI" data-type="string" alignment="center" /> -->
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
    DxToolbar,
    DxItem
    // DxButton
} from 'devextreme-vue/data-grid'
import DxButton from "devextreme-vue/button"
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
        DxToolbar,
        DxButton,
        DxItem
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            historial: [],
        }
    },
    props: {
        Registro: null,
        usoComponente: false // Variable para indicar que se está usando la vista desde otro componente
    },
    methods: {
        async cargarLibros() {
            await axios.post('http://localhost:3000/api/LibroSalarios', {
                    partida: 4303,
                    plaza: 1340,
                    registro: 980834,
                    busqueda: "ppr"
                })
                .then(resp => {
                    console.log(resp)
                    if (resp.data.data.historial.length > 0) {
                        this.historial = resp.data.data.historial
                    }
                })
        },

        async descargarCertificacionNominal(e) {
            await axios.post('http://localhost:3000/api/CertificacionNominal', {
                    idpersona: 3909,
                    fileType: "pdf"
                }, {
                    responseType: 'arraybuffer',
                })
                .then(resp => {
                    console.log(resp)
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
                    console.log(resp)
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
    }
}
</script>
