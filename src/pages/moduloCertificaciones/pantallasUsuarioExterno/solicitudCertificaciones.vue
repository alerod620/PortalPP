<template>
  <div class="container">
    <!-- Modal para mostrar mensajes -->
    <ModalMensaje
      :isVisible="showModal"
      :titulo="modalTitle"
      :mensaje="modalMessage"
      @cerrar-modal="closeModal"
    />

    <h1>Solicitar Certificación</h1>

    <div class="form-group">
      <label for="certificacion">Seleccione la certificación</label>
      <select v-model="certificacion" id="certificacion" class="form-control" @change="actualizarDescripcion">
        <option v-for="certificacion in modulos" :key="certificacion.idTipo_Certificacion" :value="certificacion.idTipo_Certificacion">
          {{ certificacion.idTipo_Certificacion }} - {{ certificacion.nombre }}
        </option>
      </select>
      <textarea v-model="descripcionCertificacion" rows="4" class="form-control" readonly>
        {{ descripcionCertificacion }}
      </textarea>
    </div>

    <!-- Formulario con dos columnas -->
    <div class="form-container">
      <div class="form-column">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <div v-if="usuario">
            <input type="text" id="usuario.nombre" v-model="nombre" class="form-control" />
          </div>
          <div v-else>
            <input type="text" id="nombre" v-model="nombre" class="form-control" placeholder="Nombre completo" />
          </div>
        </div>

        <div class="form-group">
          <label for="plaza">Plaza</label>
          <input type="text" id="plaza" v-model="plaza" class="form-control" placeholder="Plaza" />
        </div>

        <div class="form-group" v-if="mostrarCopiaDpi">
          <label for="copiaDpi">Copia de DPI</label>
          <input type="file" id="copiaDpi" @change="handleFileUpload($event, 'copiaDpi')" class="form-control-file" />
        </div>
      </div>

      <div class="form-column">
        <div class="form-group">
          <label for="Labeldpi">DPI</label>
          <input type="text" id="dpi" v-model="dpi" class="form-control" placeholder="Número de DPI" />
        </div>

        <div class="form-group">
          <label for="partida">Partida</label>
          <input type="text" id="partida" v-model="partida" class="form-control" placeholder="Partida" />
        </div>

        <div class="form-group">
          <label for="registro">Registro</label>
          <input type="text" id="registro" v-model="registro" class="form-control" placeholder="Registro" />
        </div>

        <div class="form-group" v-if="mostrarCopiaDpi">
          <label for="boletaPago">Boleta de pago</label>
          <input type="file" id="boletaPago" @change="handleFileUpload($event, 'boletaPago')" class="form-control-file" />
        </div>
      </div>
    </div>

    <button @click="solicitarCertificacion" class="btn btn-success">Solicitar</button>
  </div>
</template>

<script>
import axios from 'axios';
import ModalMensaje from '../../../components/Modals/SolicitudEstadoDeCuentaModal.vue';

export default {
  components: {
    ModalMensaje,
  },
  data() {
    return {
      usuario: null,
      certificacion: '',
      descripcionCertificacion: '',
      nombre: '',
      dpi: '',
      plaza: '',
      partida: '',
      registro: '',
      copiaDpi: null,
      boletaPago: null,
      modulos: [],
      showModal: false,
      modalTitle: '',
      modalMessage: '',
    };
  },
  computed: {
    mostrarCopiaDpi() {
      return this.certificacion === 2;
    },
  },
  mounted() {
    this.cargarCertificaciones();
    this.obtenerUsuario();
  },
  methods: {
    handleFileUpload(event, field) {
      const file = event.target.files[0];
      if (field === 'copiaDpi') {
        this.copiaDpi = file;
      } else if (field === 'boletaPago') {
        this.boletaPago = file;
      }
    },
    actualizarDescripcion() {
      const certificacionSeleccionada = this.modulos.find(
        (cert) => cert.idTipo_Certificacion === this.certificacion
      );
      this.descripcionCertificacion = certificacionSeleccionada ? certificacionSeleccionada.descripcion : '';
    },
    
    solicitarCertificacion() {
  console.log("nombre " + this.nombre);

  // Crear un objeto con los datos que deseas enviar
  const data = {
    tipoCertificacion: this.certificacion,
    nombre: this.nombre,
    dpi: this.dpi,
    plaza: this.plaza,
    partida: this.partida,
    registro: this.registro,
    rutaDocumento: 'ruta de prueba',
  };

  // Agregar archivos solo si están presentes
  if (this.copiaDpi) {
    data.copiaDpi = this.copiaDpi.name; // Envía solo el nombre del archivo
  }
  if (this.boletaPago) {
    data.boletaPago = this.boletaPago.name; // Envía solo el nombre del archivo
  }

  console.log('Datos de la solicitud:', data);

  // Endpoint del backend
  const url = 'http://localhost:3000/api/certificaciones/crearSolicitud';

  // Realizar la solicitud POST con los datos
  axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json', // Especifica que estás enviando JSON
      },
    })
    .then(resp => {
      console.log(resp.data);

      // Verificar si la solicitud fue exitosa
      if (resp.status==200) {
        this.openModal('Éxito', 'La solicitud se creó exitosamente.');
      } else {
        this.openModal('Error', 'Hubo un problema al crear la solicitud.');
      }
    })
    .catch(error => {
      console.error('Error al cargar certificaciones:', error);
      this.openModal('Error', 'Hubo un problema al conectar con el servidor.');
    });
},
    openModal(title, message) {
      this.modalTitle = title;
      this.modalMessage = message;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    obtenerUsuario() {
      const url = 'http://localhost:3000/api/certificaciones/usuario';
      const data = { dpi: 1234567890123 };

      axios
        .post(url, data)
        .then(resp => {
          if (resp.data) {
            this.usuario = resp.data;
            this.nombre = resp.data.nombre;
            this.dpi = resp.data.DPI;
            this.partida = resp.data.partida;
            this.registro = resp.data.registo;
            this.plaza = resp.data.plaza;
          }
        })
        .catch(error => {
          console.error('Error al obtener el usuario:', error);
        });
    },
    cargarCertificaciones() {
      axios
        .get('http://localhost:3000/api/certificaciones/tiposCertificaciones')
        .then(resp => {
          if (resp.data.length > 0) {
            this.modulos = resp.data;
            if (this.modulos.length > 0) {
              this.certificacion = this.modulos[0].idTipo_Certificacion;
              this.descripcionCertificacion = this.modulos[0].descripcion;
            }
          }
        })
        .catch(error => {
          console.error('Error al cargar certificaciones:', error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-container {
  display: flex;
  justify-content: space-between;
}

.form-column {
  width: 48%;
}

textarea {
  width: 100%;
  margin-top: 10px;
}

.btn {
  display: block;
  width: 100%;
  margin-top: 20px;
}
</style>