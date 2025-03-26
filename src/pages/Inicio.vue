<template>
  <div class="inicio-container">
    <h1>Bienvenidos al Portal</h1>
    <p>¡Explora nuestras opciones y conoce más sobre el Plan de Prestaciones!</p>

    <DxGallery :items="carouselItems" :show-nav-buttons="true" height="500px" :loop="true" :slideshow-delay="2000">
      <template #item="{ data }">
        <div class="carousel-item">
          <img :src="require(`@/assets/img/${data.image}`)"  />
          <div class="carousel-caption">
            <!-- <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p> -->
          </div>
        </div>
      </template>
    </DxGallery>
  </div>
</template>

<script>
import { DxGallery } from 'devextreme-vue/gallery';

export default {
  name: 'InicioPage',
  components: {
    DxGallery,
  },
  data() {
    return {
      carouselItems: [
        {
          title: 'Bienvenida',
          description: 'Conoce el Plan de Prestaciones de la Universidad de San Carlos de Guatemala.',
          image: 'usac.jpg',
        },
        {
          title: 'Servicios',
          description: 'Accede a los diferentes servicios y programas que ofrecemos a nuestros afiliados.',
          image: 'usac2.jpeg',
        },
        {
          title: 'Noticias',
          description: 'Mantente informado sobre las últimas noticias y circulares importantes.',
          image: 'usac3.jpg',
        },
      ],
    };
  },
};
</script>

<style scoped>
.inicio-container {
  padding: 2rem;
  text-align: center;
}

.carousel-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>
