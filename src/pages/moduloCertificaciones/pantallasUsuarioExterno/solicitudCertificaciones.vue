<template>
  <div class="container">
    <!-- Modal para mostrar mensajes -->
    <ModalMensaje
      :isVisible="showModal"
      :titulo="modalTitle"
      :mensaje="modalMessage"
      @cerrar-modal="closeModal"
    />

    <h1 class="title">Solicitar Certificación</h1>

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
          <input type="text" id="nombre" v-model="nombre" class="form-control" placeholder="Nombre completo" />
        </div>

        <div class="form-group">
          <label for="plaza">Plaza</label>
          <input type="text" id="plaza" v-model="plaza" class="form-control" placeholder="Plaza" />
        </div>

        <div class="form-group" v-if="mostrarCopiaDpi">
          <div class="form-group">
            <label for="dependencia">Dependencia en la Cual Laboro</label>
            <input type="text" id="dependencia" v-model="dependencia" class="form-control" placeholder="Dependencia" />
          </div>
          
          <label for="voucherePago">Voucher de pago</label>
          <input type="file" id="voucherePago" @change="handleFileUpload($event, 'voucherePago')" class="form-control-file" />
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
      </div>
    </div>

    <button @click="solicitarCertificacion" class="btn btn-success">Solicitar</button>

    <ModalMensaje
      :isVisible="showModal"
      :titulo="modalTitle"
      :mensaje="modalMessage"
      @cerrar-modal="handleCloseModal"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ModalMensaje from '../../../components/Modals/modalRespuestaCreacionSolicitud.vue';

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
      dependencia: '', // Campo agregado
      voucherePago: null,
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
    handleCloseModal() {
      console.log(this.modalTitle);
      if(this.modalTitle !== "Error"){
        this.$router.push("/");
      }
      this.showModal = false;
    },
    handleFileUpload(event, field) {
      const file = event.target.files[0];
      if (field === 'voucherePago') {
        this.voucherePago = file;
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
      console.log("****nombre " + this.nombre);

      // Validación del campo "Dependencia"
      if (this.mostrarCopiaDpi && !this.dependencia.trim()) {
        this.openModal("Error", "El campo 'Dependencia en la cual laboro' es obligatorio.");
        this.$nextTick(() => {
          document.getElementById("dependencia").focus();
        });
        return;
      }

      if(this.mostrarCopiaDpi && !this.voucherePago){
        this.openModal("Error", "Subir voucher de pago.");
        return;
      }

      // Crear objeto con los datos
      const data = {
        tipoCertificacion: this.certificacion,
        nombre: this.nombre,
        dpi: this.dpi,
        plaza: this.plaza,
        partida: this.partida,
        registro: this.registro,
        dependencia: this.dependencia, // Se envía la dependencia
        rutaDocumento: 'ruta de prueba',
        idSolicitud: null
      };

      // Agregar archivos solo si están presentes
      if (this.voucherePago) {
        data.voucherePago = this.voucherePago.name;
      }
      if (this.boletaPago) {
        data.boletaPago = this.boletaPago.name;
      }

      console.log('Datos de la solicitud:', data);

      // Enviar solicitud al backend
      const url = 'http://localhost:3000/api/certificaciones/crearSolicitud';

      axios
        .post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(resp => {
          console.log(resp.data);

          if (resp.status === 200 && resp.data.idSolicitud) {
            this.openModal('Éxito', 'La solicitud se creó exitosamente.');
            this.idSolicitud = resp.data.idSolicitud; // Asegúrate de que el idSolicitud esté disponible
            this.subirVoucher();
          } else {
            console.log(resp.data);
            this.openModal('Error', 'Hubo un problema al crear la solicitud.');
          }
        })
        .catch(error => {
          console.error('Error al conectar con el servidor:', error);
          this.openModal('Error', 'Hubo un problema al conectar con el servidor.');
        });
    },
    openModal(title, message) {
      console.log('Abrir modal:', title, message);
      this.modalTitle = title;
      this.modalMessage = message;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    async subirVoucher() {
      console.log("Entro al metodo envio de voucher");

      // Verificar si el archivo del voucher está presente
      if (!this.voucherePago) {
        this.mensaje = "Error: Falta el archivo del voucher.";
        this.error = true;
        return;
      }

      // Obtener el DPI del usuario
      const dpiUsuario = this.dpi;

      // Obtener la fecha actual en formato DDMMYYYY
      const fechaActual = new Date();
      const dia = String(fechaActual.getDate()).padStart(2, '0');
      const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
      const año = fechaActual.getFullYear();
      const fechaFormateada = `${dia}${mes}${año}`;

      // Crear el nuevo nombre del archivo
      const nuevoNombreArchivo = `${dpiUsuario}_${fechaFormateada}_VoucherDePago.pdf`;

      // Crear un nuevo archivo Blob con el mismo contenido pero con el nuevo nombre
      const archivoRenombrado = new File([this.voucherePago], nuevoNombreArchivo, {
        type: this.voucherePago.type
      });

      // Crear FormData y adjuntar el archivo con el nuevo nombre
      const formData = new FormData();
      formData.append("file", archivoRenombrado);
      formData.append("userId", 1);
      formData.append("tipoDocumento", "voucherDePago");
      formData.append("userDocument", this.dpi);
      formData.append("idTipoDocumento", 1);
      formData.append("idEstadoCuenta", this.idSolicitud);
      formData.append("typeDocumento", "VOUCHER_PAGO");

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
            this.registro = resp.data.registro;
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
            this.certificacion = this.modulos[0].idTipo_Certificacion;
            this.descripcionCertificacion = this.modulos[0].descripcion;
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

.title {
    font-size: xx-large;
    text-align: center;
    color: #0B355B;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-bottom: 20px;
  }
</style>