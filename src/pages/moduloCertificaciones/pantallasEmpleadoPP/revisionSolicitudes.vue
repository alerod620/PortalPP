<template>
  <div class="solicitudes-container">
    <h1 class="title">Solicitudes</h1>

    <!-- Tabla de solicitudes -->
    <div class="row p-2" style="display: grid; place-items: center;">
      <DxDataGrid
        v-bind="DefaultDxGridConfiguration"
        :data-source="solicitudes"
        :paging="{ enabled: true }"
        :filter-sync-enabled="true"
        :header-filter="{ visible: true, allowSearch: true }"
        :search-panel="{ visible: true }"
        :height="'100%'"
        :width="'100%'"
      >
        <DxSelection mode="single" />

        <DxEditing
          :allow-updating="false"
          :allow-adding="false"
          :allow-deleting="false"
          mode="popup"
          :use-icons="true"
          :confirm-delete="true"
        />

        <!-- Columnas de la tabla -->
        <DxColumn width="auto" data-field="idSolicitud" caption="ID" data-type="number" alignment="center" />
        <DxColumn width="auto" data-field="tipoCertificacion" caption="Tipo" data-type="string" alignment="center" />
        <DxColumn width="auto" data-field="fechaUltimaActualizacion" caption="Fecha Actualización" data-type="string" alignment="center" />
        <DxColumn width="auto" data-field="estado" caption="Estado" data-type="string" alignment="center" />
        
        <DxColumn
          width="auto"
          caption="Asignado"
          alignment="center"
          cell-template="asignadoTemplate" 
        />

        <!-- Plantilla para la columna "Asignado" -->
            <template #asignadoTemplate="{ data }">
              <span v-if="data.data.PersonalIPP_idEmpleado === null" class="icono-x">
               
                <font-awesome-icon :icon="['far', 'rectangle-xmark']" />
              </span>
              <span v-else class="icono-check">
                
                <font-awesome-icon :icon="['far', 'square-check']" />
              </span>
            </template>
          

        <!-- Columna personalizada para el botón "Revisar" -->
        <DxColumn
          :width="100"
          caption="Acciones"
          alignment="center"
          cell-template="botonRevisarTemplate" 
        />
        
        <!-- Plantilla para el botón "Revisar" -->
        <template #botonRevisarTemplate="{ data }">
          <button class="boton-revisar" @click="verSolicitud(data.data)">
            Revisar
          </button>
        </template>
      </DxDataGrid>
    </div>

    <!-- Modal de Vista Previa -->
    <ModalVistaPrevia
      v-if="modalVisible"
      :solicitud="solicitudSeleccionada"
      :isVisible="modalVisible"
      @cerrar-modal="cerrarModal"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { DxDataGrid, DxColumn, DxSelection, DxEditing } from 'devextreme-vue/data-grid';
import ModalVistaPrevia from '../../../components/Modals/SolicitudEstadoDeCuentaModal.vue';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxSelection,
    DxEditing,
    ModalVistaPrevia,
  },
  data() {
    return {
      solicitudes: [],
      modalVisible: false,
      solicitudSeleccionada: null,
      DefaultDxGridConfiguration: {
        showBorders: true,
        rowAlternationEnabled: true,
        columnAutoWidth: true,
        columnHidingEnabled: true,
      },
    };
  },
  methods: {
    // Método para obtener las solicitudes desde el backend
    obtenerSolicitudes() {
      console.log('Obteniendo solicitudes pendientes...');
      const url = 'http://localhost:3000/api/certificaciones/getSolicitudesPendientes';
      const data = { idUsuarioEmpleado: 1 };

      axios
        .post(url, data)
        .then(resp => {
          console.log(resp.data);

          if (resp.data.success && resp.data.data) {
            this.solicitudes = resp.data.data;
            console.log("Solicitudes obtenidas:", this.solicitudes);
          } else {
            console.warn("No se encontraron solicitudes pendientes.");
          }
        })
        .catch(error => {
          console.error('Error al obtener las solicitudes:', error);
        });
    },

    // Método para ver una solicitud (acción del botón en la columna)
    verSolicitud(solicitud) {
      this.solicitudSeleccionada = solicitud;
      this.modalVisible = true;
    },

    // Acción para cerrar el modal
    cerrarModal() {
      this.modalVisible = false;
    },
  },
  mounted() {
    this.obtenerSolicitudes();
  },
};
</script>

<style scoped>
.solicitudes-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: xx-large;
  text-align: center;
  color: #0B355B;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  margin-bottom: 20px;
}

/* Estilos para el botón "Revisar" */
.boton-revisar {
  background-color: #4CAF50; /* Color de fondo */
  color: white; /* Color del texto */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  padding: 5px 10px; /* Espaciado interno */
  font-size: 14px; /* Tamaño de la fuente */
  cursor: pointer; /* Cambia el cursor al pasar el mouse */
  transition: background-color 0.3s ease; /* Transición suave */
}

.boton-revisar:hover {
  background-color: #45a049; /* Cambia el color al pasar el mouse */
}

.icono-x {
  color: red; /* Color rojo para el ícono de "X" */
  font-size: 18px;
}

.icono-check {
  color: green; /* Color verde para el ícono de "check" */
  font-size: 18px;
}
</style>