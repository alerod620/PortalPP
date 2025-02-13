<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h2>Validar Solicitud</h2>

      <!-- Tabla de información de la solicitud -->
      <table class="solicitud-table">
        <thead>
          <tr>
            <th colspan="2">Tipo de certificación</th>
            <th>DPI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">{{ solicitud.tipoCertificacion }}</td>
            <td>{{ solicitud.usuario_DPI }}</td>
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
            <th>Documento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fecha carga: {{ solicitud.fechaCargaDPI }}</td>
            <td v-if="documentoDPI">
              <a :href="documentoDPI.url" target="_blank">{{ documentoDPI.nombreDocumento }}</a>
            </td>
            <td v-else>No hay DPI para mostrar</td>
            <td>
              <button @click="verVistaPreviaDPI" class="btn btn-primary" :disabled="!documentoDPI">Vista Previa</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Input para seleccionar el archivo -->
      <div class="file-upload">
        <input type="file" @change="seleccionarArchivo" accept="application/pdf" />
        <p v-if="mensaje" :class="{ error: error }">{{ mensaje }}</p>
      </div>

      <!-- Botón para subir el documento y rechazar solicitud -->
      <div class="button-group">
        <button @click="subirDocumento" :disabled="!archivo" class="btn btn-upload">
          Subir Documento
        </button>
        <button @click="rechazarSolicitud" class="btn btn-danger">
          Rechazar Solicitud
        </button>
      </div>

      <!-- Cuadro de texto para ingresar motivo -->
      <div v-if="mostrarMotivo" class="motivo-container">
        <textarea v-model="motivo" placeholder="Ingrese el motivo para rechazar" class="motivo-input"></textarea>
        <button @click="enviarMotivo" class="btn btn-warning">Enviar Motivo</button>
      </div>

      <!-- Botón para cerrar el modal -->
      <button @click="cerrarModal" class="btn btn-close">Cerrar</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
  data() {
    return {
      archivo: null,
      mensaje: "",
      error: false,
      motivo: "",
      mostrarMotivo: false,
      documentoDPI: null // Información sobre el documento DPI
    };
  },
  methods: {
    cerrarModal() {
      this.$emit("cerrar-modal");
    },
    async verVistaPreviaDPI() {
      if (this.documentoDPI && this.documentoDPI.url) {
        window.open(this.documentoDPI.url, "_blank");
      } else {
        alert("No hay documento disponible para vista previa.");
      }
    },
    validarDPI() {
      alert("Validar Copia DPI");
    },
    seleccionarArchivo(event) {
      const file = event.target.files[0];
      if (file && file.type === "application/pdf") {
        this.archivo = file;
        this.mensaje = "Archivo listo para subir.";
        this.error = false;
      } else {
        this.mensaje = "Solo se permiten archivos PDF.";
        this.error = true;
        this.archivo = null;
      }
    },
    async obtenerDocumentoDPI() {
      if (this.solicitud && this.solicitud.usuario_DPI) {
        try {
          const response = await axios.get(`http://localhost:3000/api/certificaciones/file/${this.solicitud.usuario_DPI}.pdf`);
          if (response.data && response.data.url) {
            this.documentoDPI = {
              url: response.data.url,
              nombreDocumento: `${this.solicitud.usuario_DPI}_copia_DPI.pdf`
            };
          } else {
            this.documentoDPI = null;
          }
        } catch (error) {
          console.error("Error al obtener el documento DPI", error);
          this.documentoDPI = null;
        }
      }
    },
    async subirDocumento() {
      if (!this.archivo || !this.solicitud || !this.solicitud.usuario_DPI) {
        this.mensaje = "Error: Falta el archivo o el DPI del usuario.";
        this.error = true;
        return;
      }

      // Obtener el DPI del usuario
      const dpiUsuario = this.solicitud.usuario_DPI;

      // Obtener la fecha actual en formato DDMMYYYY
      const fechaActual = new Date();
      const dia = String(fechaActual.getDate()).padStart(2, '0');
      const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
      const año = fechaActual.getFullYear();
      const fechaFormateada = `${dia}${mes}${año}`;

      // Crear el nuevo nombre del archivo
      const nuevoNombreArchivo = `${dpiUsuario}_${fechaFormateada}_estadoCuenta.pdf`;

      // Crear un nuevo archivo Blob con el mismo contenido pero con el nuevo nombre
      const archivoRenombrado = new File([this.archivo], nuevoNombreArchivo, {
        type: this.archivo.type
      });

      // Crear FormData y adjuntar el archivo con el nuevo nombre
      const formData = new FormData();
      formData.append("file", archivoRenombrado);
      formData.append("userId", 1);
      //formData.append("userId", this.solicitud.userId);
      formData.append("tipoDocumento", this.solicitud.tipoCertificacion);
      formData.append("userDocument", this.solicitud.usuario_DPI);
      formData.append("idTipoDocumento", 1);
      formData.append("idEstadoCuenta", this.solicitud.idSolicitud);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/certificaciones/uploadFileEstadoCuenta",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        this.mensaje = `Archivo subido con éxito: ${nuevoNombreArchivo}`;
        this.error = false;
      } catch (error) {
        this.mensaje = "Error al subir el archivo.";
        this.error = true;
        console.error(error);
      }
    },
    rechazarSolicitud() {
      this.mostrarMotivo = true;
    },
    async enviarMotivo() {
      if (!this.motivo) {
        this.mensaje = "Por favor, ingrese un motivo para rechazar.";
        this.error = true;
        return;
      }

      const payload = {
        idUsuario: this.solicitud.usuario_DPI,
        idUsuarioEmpleado: 1, // Ajusta este valor según sea necesario
        idSolicitud: this.solicitud.idSolicitud,
        motivo: this.motivo
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/api/certificaciones/rechazarEstadoCuenta",
          payload
        );

        this.mensaje = "Solicitud rechazada con éxito.";
        this.error = false;
        this.mostrarMotivo = false;
        this.motivo = "";
      } catch (error) {
        this.mensaje = "Error al rechazar la solicitud.";
        this.error = true;
        console.error(error);
      }
    }
  },
  watch: {
    // Verifica si la solicitud contiene DPI y obtén el documento
    solicitud: {
      handler() {
        this.obtenerDocumentoDPI();
      },
      immediate: true
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
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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

.file-upload {
  margin-bottom: 15px;
}

input[type="file"] {
  display: block;
  margin: 10px 0;
  padding: 5px;
  font-size: 14px;
}

p {
  font-size: 14px;
  margin-top: 5px;
}

.error {
  color: red;
}

.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  font-size: 12px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-close {
  background-color: #dc3545;
  color: white;
  margin-top: 20px;
}

.btn-upload {
  background-color: #17a2b8;
  color: white;
  font-weight: bold;
}

.btn-upload:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.motivo-container {
  margin-top: 10px;
}

.motivo-input {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  padding: 5px;
}

.btn-warning {
  background-color: #ffc107;
  color: white;
}
</style>