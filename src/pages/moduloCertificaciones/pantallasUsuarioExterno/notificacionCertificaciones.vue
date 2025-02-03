<template>
    <div class="container">
      <h1>Panel de Notificaciones</h1>
  
      <!-- Notificaciones sin revisar -->
      <div class="notification-header">
        <span class="notification-icon">
          <i class="fas fa-bell"></i>
          <span class="notification-count">{{ unreadCount }}</span>
        </span>
        <span>Notificaciones sin revisar</span>
      </div>
  
      <!-- Tabla de notificaciones -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Notificación</th>
            <th>Fecha</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(notification, index) in notifications" :key="index" :class="{ unread: !notification.read }">
            <td>
              <span class="status-indicator" :class="notification.read ? 'read' : 'unread'"></span>
              {{ notification.title }}
            </td>
            <td>{{ notification.date }}</td>
            <td>
              <button v-if="notification.type === 'certificacion'" @click="viewStatus(notification)" class="btn btn-primary">
                Ver Estado
              </button>
              <button v-if="notification.type === 'solvencia'" @click="previewDocument(notification)" class="btn btn-secondary">
                Vista Previa
                <i class="fas fa-expand-arrows-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        unreadCount: 2, // Número de notificaciones sin revisar
        notifications: [
          {
            title: 'Creación de Solicitud de certificación',
            date: '02 de Mayo 2024',
            type: 'certificacion', // Diferentes tipos de notificaciones
            read: false
          },
          {
            title: 'Solvencia Generada',
            date: '02 de Mayo 2024',
            type: 'solvencia',
            read: true
          }
        ]
      };
    },
    methods: {
      // Acciones al hacer clic en "Ver Estado"
      viewStatus(notification) {
        alert(`Viendo el estado de la notificación: ${notification.title}`);
        notification.read = true;
        this.updateUnreadCount();
      },
      // Acciones al hacer clic en "Vista Previa"
      previewDocument(notification) {
        alert(`Mostrando la vista previa de: ${notification.title}`);
        notification.read = true;
        this.updateUnreadCount();
      },
      // Actualiza el número de notificaciones sin leer
      updateUnreadCount() {
        this.unreadCount = this.notifications.filter(notification => !notification.read).length;
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .notification-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .notification-icon {
    position: relative;
    margin-right: 10px;
  }
  
  .notification-icon .fas {
    font-size: 24px;
  }
  
  .notification-count {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 4px 8px;
    font-size: 12px;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th, .table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .unread {
    font-weight: bold;
  }
  
  .status-indicator {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
  }
  
  .status-indicator.unread {
    background-color: red;
  }
  
  .status-indicator.read {
    background-color: grey;
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
  
  .btn i {
    margin-left: 5px;
  }
  </style>
  