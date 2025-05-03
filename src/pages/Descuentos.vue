<template>
    <div>
        <card>
            <div class="row p-2" style="display: grid; place-items: center;">
                <DxDataGrid v-bind="DefaultDxGridConfiguration" :data-source="descuentos" :paging="{enabled: true, pageSize: 10}" :filter-sync-enabled="true" :headerFilter="{visible:false,allowSearch:true}" :searchPanel="{visible: true }" :height="'100%'" :width="'100%'">
                    
                    <DxToolbar>
                        <DxItem name="searchPanel" location="after" />
                    </DxToolbar>
                    <DxSelection mode="single" />
    
                    <DxColumn width="100px" data-field="id" caption="ID" data-type="string" alignment="center" />
                    <DxColumn width="100%" data-field="nombre" caption="Nombre" data-type="string" alignment="center" />
                    <DxColumn width="100px" data-field="monto" caption="Monto" data-type="string" alignment="center" />
    
                    <DxColumn :width="50" alignment="center" cell-template="reporte" />

                    <template #reporte="{data: info}">
                        <DxButton width="30px" height="30px" type="danger" styling-mode="contained" class="botonReporte" @click="descargarHistorialDescuentos(info.data)" hint="Certificación detallada">
                            <font-awesome-icon :icon="['fas', 'file-pdf']" style="font-size: 20px;" />
                        </DxButton>
                    </template>
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
                descuentos: [],
            }
        },
        props: {
            Registro: null,
            usoComponente: false // Variable para indicar que se está usando la vista desde otro componente
        },
        methods: {
            async cargarDescuentos() {
                await axios.post('http://localhost:3000/api/Descuentos', {
                        partida: 4303,
                        plaza: 1340,
                        registro: 980834,
                        busqueda: "ppr"
                    })
                    .then(resp => {
                        console.log(resp)
                        if (resp.data.data.listado_descuentos.length > 0) {
                            this.descuentos = resp.data.data.listado_descuentos.filter(x => parseFloat(x.monto) > 0)
                        }
                    })
            },
    
            async descargarHistorialDescuentos(e) {
                await axios.post('http://localhost:3000/api/HistorialDescuentos', {
                        idpersona: 3909,
                        iddb: e.id,
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
        },
        mounted() {
            this.cargarDescuentos()
        }
    }
    </script>
    