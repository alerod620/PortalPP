<template>
    <div class="container">
      <h1>Seguimiento de Certificación</h1>
      
      <div class="form-group">
        <label for="certificacion">Seleccione la certificación</label>
        <select v-model="certificacion" @change="handleCertificacionChange" id="certificacion" class="form-control">
          <option value="00301">00301 - Certificación Cuotas</option>
          <option value="00302">00302 - Otra Certificación</option>
          <!-- Otras opciones de certificación -->
        </select>
      </div>
  
      <div class="form-row">
        <div class="form-group">
          <label for="fechaAplicacion">Fecha Aplicación</label>
          <input type="date" id="fechaAplicacion" v-model="fechaAplicacion" class="form-control" />
        </div>
        <div class="form-group">
          <label for="codigoSolicitud">Código Solicitud</label>
          <input type="text" id="codigoSolicitud" v-model="codigoSolicitud" class="form-control" />
        </div>
      </div>
  
      <!-- Barra de progreso horizontal -->
      <div class="progress-container">
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
        certificacion: '00301', // Inicialmente la primera opción
        fechaAplicacion: '2024-05-02', // Valor de ejemplo para la fecha
        codigoSolicitud: 'CC-010210', // Ejemplo de código de solicitud
        currentStep: 3, // Cambia este valor para representar el paso actual
        totalSteps: 4, // Número total de pasos en el flujo
        fechas: ['02 Mayo 2024', '02 Mayo 2024', '---'] // Fechas de cada paso
      };
    },
    computed: {
      // Calcula el porcentaje del progreso
      progressPercentage() {
        return (this.currentStep / this.totalSteps) * 100;
      }
    },
    methods: {
      // Método que ajusta el progreso según la certificación seleccionada
      handleCertificacionChange() {
        if (this.certificacion === '00302') {
          // Si es otra certificación, ajusta el progreso al primer paso
          this.currentStep = 1;
          this.fechas = ['02 Mayo 2024', '---', '---'];
        } else {
          // Si vuelve a la primera certificación, ajusta el progreso original
          this.currentStep = 3;
          this.fechas = ['02 Mayo 2024', '02 Mayo 2024', '---'];
        }
      }
    }
  };
  </script>
  
  <style scoped>
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
  </style>
  