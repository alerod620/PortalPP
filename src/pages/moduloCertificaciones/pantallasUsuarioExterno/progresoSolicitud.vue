<template>
  <div class="container">
    <h1>Seguimiento de Certificación</h1>

    <div class="form-group">
      <label for="certificacion">Certificación:</label>
      <br>
      <label class="labelCertificacion" for="certificacion">{{ certificacionLabel }}</label>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="fechaAplicacion">Fecha Aplicación</label>
        <input type="date" id="fechaAplicacion" v-model="fechaAplicacion" class="form-control" />
      </div>
    </div>

    <!-- Barra de progreso horizontal -->
    <div class="progress-container">
      <template v-if="!esEstadoDeCuenta">
        <div class="step" :class="{ active: currentStep >= 1 }">
          <span class="step-label">Solicitud creada <br /> {{ fechas[0] }}</span>
        </div>
        <div class="progress-bar"></div>
        <div class="step" :class="{ active: currentStep >= 2 }">
          <span class="step-label">Revisada por Plan de Prestaciones <br /> {{ fechas[1] }}</span>
        </div>
        <div class="progress-bar"></div>
        <div class="step" :class="{ active: currentStep >= 3 }">
          <span class="step-label">Firma Jefe de Área <br /> {{ fechas[2] }}</span>
        </div>
        <div class="progress-bar"></div>
        <div class="step" :class="{ active: currentStep >= 4 }">
          <span class="step-label">Certificación Generada</span>
        </div>
      </template>

      <template v-if="esEstadoDeCuenta">
        <div class="step" :class="{ active: currentStep >= 1 }">
          <span class="step-label">Solicitud creada <br /> {{ fechas[0] }}</span>
        </div>
        <div class="progress-bar"></div>
        <div class="step" :class="{ active: currentStep >= 2 }">
          <span class="step-label">Revisada por Plan de Prestaciones <br /> {{ fechas[1] }}</span>
        </div>
        <div class="progress-bar"></div>
        <div class="step" :class="{ active: currentStep >= 3 }">
          <span class="step-label">Certificación Generada</span>
        </div>
      </template>
    </div>

    <!-- Barra de progreso general -->
    <div class="progress-overall">
      <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      certificacion: '00301',
      fechaAplicacion: '2024-05-02',
      codigoSolicitud: this.$route.query.codigoSolicitud || '',  // Extraer el código de solicitud desde la URL
      currentStep: 1,  // Inicializar en el primer paso
      totalSteps: 4,
      fechas: ['02 Mayo 2024', '02 Mayo 2024', '---', '---'],  // Fechas predeterminadas, puedes modificarlas más tarde
      certificacionLabel: '',
      esEstadoDeCuenta: false, // Inicializa como falso
      Solicitud: null,
    };
  },
  created() {
    this.Solicitud = this.$route.query.Solicitud;
    
    if (this.Solicitud == null) {
      alert('No se ha cargado ninguna solicitud.');
    } else {
      this.certificacionLabel = this.Solicitud.idSolicitud + " - " + this.Solicitud.tipoCertificacion;

      if (this.Solicitud.tipoCertificacion === "Estado de Cuenta") {
        this.esEstadoDeCuenta = true;
        this.totalSteps = 3;
        if (this.Solicitud.estado === "CREADA") {
          this.currentStep = 1;
        } else if (this.Solicitud.estado === "REVISADA") {
          this.currentStep = 2;
        } else {
          this.currentStep = 3;
        }

        // Modificando las fechas usando Vue.set para asegurar que se detecten los cambios
        this.$set(this.fechas, 0, formatDate(this.Solicitud.fechaCreacion));
        this.$set(this.fechas, 1, '02 abril 2025');
        this.$set(this.fechas, 2, '---');
        this.$set(this.fechas, 3, '---');
      } else if (this.Solicitud.tipoCertificacion === "Saldo Prestamos") {
        this.esEstadoDeCuenta = false;
        this.totalSteps = 4;
      }
    }
  },
  computed: {
    esEstadoDeCuenta() {
      return this.certificacion === 'estadoCuenta';
    },
    progressPercentage() {
      // Calcula el progreso en porcentaje
      return (this.currentStep / this.totalSteps) * 100;
    }
  },
  methods: {
     formatDate(dateString) {
      const date = new Date(dateString);  // Convierte la fecha a un objeto Date
      const day = String(date.getDate()).padStart(2, '0');  // Obtiene el día y asegura que sea de dos dígitos
      const month = String(date.getMonth() + 1).padStart(2, '0');  // Obtiene el mes (se suma 1 porque los meses son de 0-11)
      const year = date.getFullYear();  // Obtiene el año
      const hours = String(date.getHours()).padStart(2, '0');  // Obtiene la hora
      const minutes = String(date.getMinutes()).padStart(2, '0');  // Obtiene los minutos

      return `${day}/${month}/${year} ${hours}:${minutes}`;  // Formatea la fecha en el formato deseado
    }
  },
};
</script>

<style scoped>
/* Estilos para el componente */
.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.form-group {
  margin-bottom: 15px;
  flex: 1;
  margin-right: 20px;
}

.form-group:last-child {
  margin-right: 0;
}

.progress-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  position: relative;
}

.step-label {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}

.progress-bar {
  height: 6px;
  background-color: #ddd;
  flex-grow: 1;
  margin: 0 10px;
  position: relative;
}

.step.active .step-label {
  font-weight: bold;
  color: #4CAF50;
}

.step:before {
  content: "";
  width: 20px;
  height: 20px;
  background-color: #ddd;
  border-radius: 50%;
  border: 3px solid #4CAF50;
}

.step.active:before {
  background-color: #4CAF50;
}

.progress-bar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ddd;
  z-index: 1;
}

.progress-bar.active::before {
  background-color: #4CAF50;
}

/* Barra de progreso general */
.progress-overall {
  width: 100%;
  background-color: #ddd;
  height: 10px;
  border-radius: 5px;
  margin-top: 20px;
  overflow: hidden;
}

.progress-fill {
  background-color: #4CAF50;
  height: 100%;
  transition: width 0.3s ease;
}

.labelCertificacion {
  text-align: center; /* Centra el título */
  margin: 30px 0; /* Espaciado superior e inferior */
  font-family: 'Arial', sans-serif; /* Fuente de título */
  font-size: 20px; /* Tamaño del título */
  font-weight: bold; /* Estilo en negrita */
  color: #000000; /* Color del título */
  text-transform: uppercase; /* Convertir a mayúsculas */
  letter-spacing: 2px; /* Espaciado entre letras */
  margin-bottom: 20px; /* Espacio debajo del título */
}

</style>
