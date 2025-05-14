<template>
  <div class="unauthorized-container">
    <div class="unauthorized-content">
      <div class="error-content">
        <div class="icon-container">
          <i class="fa fa-exclamation-triangle"></i>
        </div>
        <div class="text-content">
          <h1>Acceso No Autorizado</h1>
          <p class="message">
            Lo sentimos, no tienes los permisos necesarios para acceder a esta página. 
            Si crees que es un error, por favor contacta al administrador del sistema.
          </p>
        </div>
      </div>
      
      <div class="actions">
        <router-link 
          to="/dashboard/inicio" 
          class="btn btn-primary"
        >
          <i class="fa fa-home"></i> Volver al Inicio
        </router-link>
        <button 
          @click="cerrarSesion" 
          class="btn btn-outline-danger"
        >
          <i class="fa fa-sign-out"></i> Cerrar Sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoAutorizado',
  methods: {
    cerrarSesion() {
      // Limpiar datos de autenticación
      localStorage.removeItem('authToken');
      localStorage.removeItem('usuarioActivo');
      localStorage.removeItem('cuenta');
      
      // Redirigir al login
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style scoped>
.unauthorized-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background-color: #f8f9fa;
}

.unauthorized-content {
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  text-align: left;
}

.error-content {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.icon-container {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background-color: #fff8e6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-container i {
  font-size: 2rem;
  color: #ffa502;
}

.text-content {
  flex: 1;
}

h1 {
  color: #343a40;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.message {
  color: #6c757d;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.actions {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.65rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn i {
  font-size: 0.9em;
}

.btn-primary {
  background-color: #3490dc;
  border-color: #3490dc;
  color: white;
}

.btn-primary:hover {
  background-color: #2779bd;
  border-color: #1c6daa;
  transform: translateY(-1px);
}

.btn-outline-danger {
  color: #dc3545;
  border-color: #dc3545;
  background-color: transparent;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 576px) {
  .unauthorized-content {
    padding: 1.75rem 1.5rem;
  }
  
  .error-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
  
  .actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
