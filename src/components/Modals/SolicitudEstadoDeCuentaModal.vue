<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h2>Validar Solicitud</h2>

      <!-- Tabla de información de la solicitud -->
      <table class="solicitud-table">
        <thead>
          <tr>
            <th colspan="2">Tipo de certificación o Solvencia Nombre</th>
            <th>Rango de fechas DPI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">{{ solicitud.nombre }}</td>
            <td>{{ solicitud.rangoFechasDPI }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Tabla de Plaza, Partida y Registro -->
      <table class="solicitud-table">
        <thead>
          <tr>
            <th>Plaza</th>
            <th>Partida</th>
            <th>Registro</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ solicitud.plaza }}</td>
            <td>{{ solicitud.partida }}</td>
            <td>{{ solicitud.registro }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Tabla de Copia DPI -->
      <table class="solicitud-table">
        <thead>
          <tr>
            <th>Copia DPI</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fecha carga: {{ solicitud.fechaCargaDPI }}</td>
            <td>{{ solicitud.estadoDPI }}</td>
            <td>
              <button @click="verVistaPreviaDPI" class="btn btn-primary">Vista Previa</button>
              <button @click="validarDPI" class="btn btn-success">Validar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Tabla de Boleta de Pago -->
      <table class="solicitud-table">
        <thead>
          <tr>
            <th>Boleta de Pago</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fecha carga: {{ solicitud.fechaCargaBoleta }}</td>
            <td>{{ solicitud.estadoBoleta }}</td>
            <td>
              <button @click="verVistaPreviaBoleta" class="btn btn-primary">Vista Previa</button>
              <button @click="validarBoleta" class="btn btn-success">Validar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Botón para cerrar el modal -->
      <button @click="cerrarModal" class="btn btn-close">Cerrar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    solicitud: {
      type: Object,
      required: true
    },
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    cerrarModal() {
      this.$emit('cerrar-modal');
    },
    verVistaPreviaDPI() {
      alert('Vista previa de Copia DPI');
    },
    validarDPI() {
      alert('Validar Copia DPI');
    },
    verVistaPreviaBoleta() {
      alert('Vista previa de Boleta de Pago');
    },
    validarBoleta() {
      alert('Validar Boleta de Pago');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
}

.solicitud-table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.solicitud-table th,
.solicitud-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.solicitud-table th {
  background-color: #f5f5f5;
}

.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-close {
  background-color: #dc3545;
  color: white;
  margin-top: 20px;
}
</style>