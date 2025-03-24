<template>
    <div class="contact-container">
      <h1>Contáctenos</h1>
      <p>¡Estamos aquí para ayudarte! Puedes comunicarte con nosotros a través del siguiente formulario:</p>
  
      <form @submit.prevent="submitForm" class="contact-form">
        <label for="name">Nombre:</label>
        <input id="name" v-model="name" type="text" placeholder="Tu nombre" required />
  
        <label for="email">Correo Electrónico:</label>
        <input id="email" v-model="email" type="email" placeholder="tu@email.com" required />
  
        <label for="message">Mensaje:</label>
        <textarea id="message" v-model="message" placeholder="Escribe tu mensaje" required></textarea>
  
        <button type="submit">Enviar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContactenosPage',
    data() {
      return {
        name: '',
        email: '',
        message: '',
      };
    },
    methods: {
      submitForm() {
        alert(`Mensaje enviado por: ${this.name}`);
        this.name = '';
        this.email = '';
        this.message = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .contact-container {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-top: 1rem;
    font-weight: bold;
  }
  
  input,
  textarea {
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    margin-top: 1rem;
    padding: 0.75rem;
    background-color: #01264e;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #014080;
  }
  </style>
  