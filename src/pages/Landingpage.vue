<template>
<div>
    <!-- Barra de Navegación -->
    <DxTabs :selected-index="SelectedOption" height="10%" width="100%" :rtl-enabled="false" orientation="horizontal" styling-mode="secondary" :icon-position="'top'" :show-nav-buttons="true" :scroll-by-content="true" @item-click="navigateTo">
        <DxItem v-for="(item, index) in buttons" :key="index" template="tabButton" />
        <template #tabButton="{ index }">
            <div class="tab-button-container" :class="{ 'active-tab': SelectedOption === index }">
                <font-awesome-icon :icon="['fas', buttons[index].icon]" style="font-size: 30px;" />
                <span class="ml-2" style="font-size: 16px;">{{ buttons[index].name }}</span>
            </div>
        </template>
    </DxTabs>

    <!-- Contenido de la Página -->
    <div class="page-content">
        <router-view />
    </div>

    <!-- Pie de Página -->
    <footer class="footer">
        <div class="footer-content">
            <p>&copy; 2025 Universidad de San Carlos de Guatemala - Facultad de Ingeniería</p>
        </div>
    </footer>
</div>
</template>

<script>
import {
    DxTabs,
    DxItem
} from 'devextreme-vue/tabs';
import 'devextreme-vue/text-area';

export default {
    name: 'LandingPage',
    components: {
        DxTabs,
        DxItem,
    },
    data() {
        return {
            SelectedOption: 0,
            buttons: [{
                    name: 'Inicio',
                    icon: 'home',
                    route: '/'
                },
                {
                    name: 'Nosotros',
                    icon: 'people-group',
                    route: '/nosotros'
                },
                {
                    name: 'Circulares',
                    icon: 'newspaper',
                    route: '/circulares'
                },
                {
                    name: 'Contáctenos',
                    icon: 'comment-dots',
                    route: '/contacto'
                },
                {
                    name: 'Iniciar sesión',
                    icon: 'user',
                    route: '/login'
                },
            ],
        };
    },
    methods: {
        navigateTo(e) {
            this.SelectedOption = e.itemIndex;
            this.$router.push(this.buttons[e.itemIndex].route);
        },
        updateSelectedTab() {
            const currentRoute = this.$route.path;
            const foundIndex = this.buttons.findIndex(button => button.route === currentRoute);
            this.SelectedOption = foundIndex !== -1 ? foundIndex : 0;
        },
    },
    watch: {
        '$route': 'updateSelectedTab',
    },
    mounted() {
        this.updateSelectedTab();
    },
};
</script>

<style scoped>
.footer {
    background-color: #01264e;
    color: white;
    text-align: center;
    padding: 1rem 0;
    margin-top: 2rem;
}

.footer-content p {
    margin: 0;
}

.page-content {
    min-height: calc(100vh - 150px);
}

/* Resalta la pestaña seleccionada */
.active-tab {
    background-color: #01264e;
    color: white;
    border-radius: 8px;
    padding: 8px;
    display: flex;
    place-items: center
}

/* Estilos para las pestañas */
.tab-button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
    cursor: pointer;
}

/* Asegura que el icono esté centrado */
.tab-icon {
    font-size: 30px;
    margin-right: 5px; /* Añadido margen entre el icono y el texto */
}

/* Asegura que el texto de las pestañas esté centrado */
.tab-text {
    font-size: 16px;
    margin-top: 5px;
}

/* Estilo para la pestaña activa */
.active-tab .tab-button-container {
    background-color: #01264e;
    color: white;
    border-radius: 8px;
    padding: 8px;
}
</style>
