<template>
    <div class="nosotros-container">
      <h1 class="title">Misión</h1>
      <p class="description">
        Somos una dependencia con personal calificado, con mística de trabajo y alto compromiso de servicio; responsable de asegurar y proteger a los afiliados al Plan de Prestaciones de la Universidad de San Carlos de Guatemala, mediante el otorgamiento de prestaciones de manera eficaz y eficiente. Así como del desarrollo permanente de programas de beneficio social.
      </p>
  
      <h1 class="title">Visión</h1>
      <p class="description">
        Ser una dependencia de servicio, con un equipo de trabajo profesional, que posea alta sensibilidad social, calificado y tecnificado, con el objetivo de aumentar las prestaciones y ampliar los beneficios que permitan contribuir a mejorar la calidad de vida de los afiliados al Plan de Prestaciones de la Universidad de San Carlos de Guatemala.
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Nosotros',
  };
  </script>
  
  <style scoped>
  .nosotros-container {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .title {
    font-size: 36px;
    font-weight: bold;
    color: #01264e;
    margin-top: 1.5rem;
  }
  
  .description {
    font-size: 22px;
    line-height: 1.6;
    margin-top: 1rem;
    color: #333;
  }
  </style>