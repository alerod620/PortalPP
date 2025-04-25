<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <!-- Botón de cierre en la esquina superior derecha -->
      <button class="close" @click="cerrarModal">✖</button>
      
      <div class="mensaje">
      <h2>{{ titulo }}</h2>
      <p>{{ mensaje }}</p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    titulo: String,
    mensaje: String,
  },
  methods: {
    cerrarModal() {
      this.$emit("cerrar-modal"); // Emitir evento para que el padre controle el cierre y la redirección
    },
  },
};
</script>

<style scoped>
/* Fondo del modal (oscurece la pantalla) */
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

/* Caja del modal */
.modal-content {
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

/* Botón de cierre */
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease-in-out;
}

.close:hover {
  background-color: darkred;
}
.mensaje{
  margin-top: 2%;
}
</style>
