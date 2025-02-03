<template>
    <div class="container">
      <h1>Solicitar Certificación</h1>
      
      <div class="form-group" >
        <label for="certificacion">Seleccione la certificación</label>
          <select v-model="certificacion" id="certificacion" class="form-control">
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
              <!-- Input que está enlazado a la propiedad 'nombre' -->
              <input type="text" id="usuario.nombre" v-model="nombre" class="form-control"   />
            </div>

            <div v-else>
              <input type="text" id="nombre" v-model="nombre" class="form-control" placeholder="Nombre completo"  />
            </div>
          </div>
  
          <div class="form-group">
            <label for="plaza">Plaza</label>
            <input type="text" id="plaza" v-model="plaza" class="form-control" placeholder="Plaza" />
          </div>
  
          <div class="form-group">
            <br>
            <br>
            <br>
            
          </div>
          
          <div class="form-group" v-if="mostrarCopiaDpi">
            <label for="copiaDpi">Copia de DPI</label>
            <input type="file" id="copiaDpi" @change="handleFileUpload($event, 'copiaDpi')" class="form-control-file" />
          </div>
        </div>
  
        <div class="form-column">
          <div class="form-group">
            <label for="Labeldpi">DPI</label>
            <input type="text" id="dpi" v-model="this.dpi" class="form-control" placeholder="Número de DPI" />
          </div>
  
          <div class="form-group">
            <label for="partida">Partida</label>
            <input type="text" id="partida" v-model="partida" class="form-control" placeholder="Partida" />
          </div>
  
          <div class="form-group">
            <label for="registro">Registro</label>
            <input type="text" id="registro" v-model="registro" class="form-control" placeholder="Registro" />
          </div>
  
          <div class="form-group " v-if="mostrarCopiaDpi">
            <label for="boletaPago">Boleta de pago</label>
            <input type="file" id="boletaPago" @change="handleFileUpload($event, 'boletaPago')" class="form-control-file" />
          </div>
        </div>
      </div>
  
      <button @click="solicitarCertificacion" class="btn btn-success">Solicitar</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // Asegúrate de tener axios importado para realizar solicitudes HTTP
  
  export default {
    data() {
  return {
    usuario: null,
    certificacion: '',  // Inicializado vacío, luego se llenará con el id de la certificación seleccionada
    descripcionCertificacion: '',
    nombre: '',
    dpi: '',
    plaza: '',
    partida: '',
    registro: '',
    copiaDpi: null,
    boletaPago: null,
    modulos: []  // Array para almacenar las certificaciones obtenidas
  };
},
mounted() {
  this.cargarCertificaciones(); // Llama a cargarCertificaciones cuando el componente se monte
  this.obtenerUsuario();
},
computed: {
    mostrarCopiaDpi() {
    return this.certificacion === 2;
    },
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
  solicitarCertificacion() {
    console.log("nombre " + this.nombre)
    const formData = new FormData();
    formData.append('certificacion', this.certificacion);
    formData.append('nombre', this.nombre);
    formData.append('dpi', this.dpi);
    formData.append('plaza', this.plaza);
    formData.append('partida', this.partida);
    formData.append('registro', this.registro);
    formData.append('copiaDpi', this.copiaDpi);
    formData.append('boletaPago', this.boletaPago);
  
    console.log('Datos de la solicitud:', formData);
    const url = 'http://localhost:3000/api/certificaciones/usuario'; // Endpoint del backend
    const data = { dpi: 1234567890123 }; // Reemplaza con el DPI que deseas consultar
  },
  obtenerUsuario() {
    console.log('prueaobtener usuario')
  const url = 'http://localhost:3000/api/certificaciones/usuario'; // Endpoint del backend
  const data = { dpi: 1234567890123 }; // Reemplaza con el DPI que deseas consultar

  axios
    .post(url, data) // Realizar la solicitud POST
    .then(resp => {
      console.log(resp.data);
      if (resp.data) {
        // Asumiendo que la respuesta es un objeto del usuario
        this.usuario = resp.data; // Almacena los datos del usuario en una variable del componente
        console.log("Usuario obtenido:", this.usuario);
        //carga a datos de variables
        this.nombre = resp.data.nombre;
        this.dpi = resp.data.DPI;
        this.partida = resp.data.partida;
        this.registro = resp.data.registo;
        this.plaza = resp.data.plaza;
      } else {
        console.warn("No se encontró el usuario.");
      }
    })
    .catch(error => {
      console.error('Error al obtener el usuario:', error);
    });
},
  cargarCertificaciones() {
    console.log("Inicio el método")
    axios
      .get('http://localhost:3000/api/certificaciones/tiposCertificaciones')
      .then(resp => {
        console.log(resp.data);
        if (resp.data.length > 0) {
          this.modulos = resp.data;  // Asigna los datos de la respuesta al array modulos
          if (this.modulos.length > 0) {
            this.certificacion = this.modulos[0].idTipo_Certificacion;  // Establece la primera opción como predeterminada
            this.descripcionCertificacion = this.modulos[0].descripcion;  // Establece la descripción correspondiente
          }
        }
      })
      .catch(error => {
        console.error('Error al cargar certificaciones:', error);
      });
  }
  }
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
    width: 48%; /* Ajusta el ancho según sea necesario */
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
  