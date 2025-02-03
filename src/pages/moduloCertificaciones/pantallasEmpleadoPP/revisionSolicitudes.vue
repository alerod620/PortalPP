<template>
  <div class="solicitudes-container">
    <h1 class="title">Solicitudes</h1>

    <!-- Lista de solicitudes -->
    <div v-for="solicitud in solicitudes" :key="solicitud.id" class="solicitud-card">
      <div class="solicitud-header">
        <span class="solicitud-id">{{ solicitud.id }} - {{ solicitud.tipo }}</span>
        <span class="fecha-actualizacion">Fecha Actualización: {{ solicitud.fechaActualizacion }}</span>
      </div>

      <div class="solicitud-estado">
        <strong>Estado:</strong> {{ solicitud.estado }}
      </div>

      <div class="solicitud-acciones">
        <button v-if="solicitud.estado === 'Solicitud ingresada'" @click="revisarSolicitud(solicitud)" class="btn btn-primary">
          Revisar
        </button>
        <button v-if="solicitud.estado === 'Espera de firma Supervisor'" @click="editarSolicitud(solicitud)" class="btn btn-secondary">
          Editar
        </button>
        <button @click="verVistaPrevia(solicitud)" class="btn btn-info">
          Vista Previa
        </button>
        <button @click="eliminarSolicitud(solicitud)" class="btn btn-danger">
          X
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Lista de solicitudes
      solicitudes: [
        {
          id: 29120,
          tipo: 'Certificación Cuotas',
          fechaActualizacion: '08/05/2024',
          estado: 'Solicitud ingresada'
        },
        {
          id: 29121,
          tipo: 'Certificación Cuotas',
          fechaActualizacion: '11/05/2024',
          estado: 'Espera de firma Supervisor'
        }
      ]
    };
  },
  methods: {
    // Acción para revisar una solicitud
    revisarSolicitud(solicitud) {
      alert(`Revisando solicitud: ${solicitud.id}`);
    },

    // Acción para editar una solicitud
    editarSolicitud(solicitud) {
      alert(`Editando solicitud: ${solicitud.id}`);
    },

    // Acción para ver la vista previa de una solicitud
    verVistaPrevia(solicitud) {
      alert(`Vista previa de la solicitud: ${solicitud.id}`);
    },

    // Acción para eliminar una solicitud
    eliminarSolicitud(solicitud) {
      if (confirm(`¿Estás seguro de eliminar la solicitud ${solicitud.id}?`)) {
        this.solicitudes = this.solicitudes.filter(s => s.id !== solicitud.id);
        alert(`Solicitud ${solicitud.id} eliminada`);
      }
    }
  }
};
</script>

<style scoped>
.solicitudes-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.solicitud-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
}

.solicitud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.solicitud-id {
  font-weight: bold;
}

.fecha-actualizacion {
  color: #666;
  font-size: 0.9em;
}

.solicitud-estado {
  margin-bottom: 10px;
}

.solicitud-acciones {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.title {
    font-size: xx-large;
    text-align: center;
    color: #0B355B;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>