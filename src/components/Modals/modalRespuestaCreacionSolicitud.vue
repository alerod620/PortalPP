<template>
    <div>
      <!-- Modal para mostrar mensajes -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>{{ modalTitle }}</h2>
          <p>{{ modalMessage }}</p>
        </div>
      </div>
  
      <!-- Resto de tu componente -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showModal: false, // Controla si el modal está visible
        modalTitle: '',   // Título del modal
        modalMessage: '', // Mensaje del modal
      };
    },
    methods: {
      // Método para abrir el modal
      openModal(title, message) {
        this.modalTitle = title;
        this.modalMessage = message;
        this.showModal = true;
      },
  
      // Método para cerrar el modal
      closeModal() {
        this.showModal = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para el modal */
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
    border-radius: 5px;
    width: 300px;
    text-align: center;
  }
  
  .close {
    float: right;
    cursor: pointer;
    font-size: 24px;
  }
  </style>