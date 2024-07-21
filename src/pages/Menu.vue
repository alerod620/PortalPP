<template>
<div class="buttons">
    <div class="p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 div-button" v-for="(item, index) in menu" v-bind:key="index">
        <vs-button class="button" color="dark" type="border" @click.native="OpcionSeleccionada(item)" >
            <!-- <div v-if="item.animation==='bf'">
                <font-awesome-icon :icon="['fas', item.icon]" class="i-size" beat-fade />
            </div>
            <div v-else-if="item.animation==='sh'">
                <font-awesome-icon :icon="['fas', item.icon]" class="i-size" shake />
            </div>
            <div v-else-if="item.animation==='sp'">
                <font-awesome-icon :icon="['fas', item.icon]" class="i-size" />
            </div> -->
            <div>
                <font-awesome-icon :icon="['fas', item.icon]" class="i-size" />
            </div>
            <span>{{item.text}}</span>
        </vs-button>
    </div>
</div>
</template>

    
<script>
export default ({
    name: "Menu",
    components: {

    },
    data() {
        return {
            selectedOption: 0,
            menu: [{
                id: 1,
                text: "Solicitudes",
                icon: "bell",
                path: "/solicitudes",
            },
            {
                id: 2,
                text: "Usuarios",
                icon: "users",
                path: "/usuarios",
            },
            {
                id: 3,
                text: "Módulos",
                icon: "users-gear",
                path: "/modulos",
            },
            {
                id: 4,
                text: "Publicaciones",
                icon: "newspaper",
                path: "/publicaciones",
            } ,
            {
                id: 5,
                text: "Reportes",
                icon: "chart-line",
                path: "",
            } ,
            {
                id: 6,
                text: "Permisos",
                icon: "key",
                path: "/permisos",
            },
            {
                id: 7,
                text: "Recibos",
                icon: "receipt",
                path: "/recibos",
            },
            {
                id: 8,
                text: "Declaración de beneficiarios",
                icon: "child-reaching",
                path: "/declaracionbeneficiarios",
            } ]
        }
    },
    methods: {
        OpcionSeleccionada(item) {
            // this.$emit('onSelectedItem', item)
            this.$router.push(item.path)
        },
    },
    watch: {},
    props: {}
})
</script>

    
<style scoped>
.buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.button {
    height: 150px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px !important;
}

.button:hover {
    background-color: rgb(0, 129, 151) !important;
}

.div-button {
    display: flex;
    justify-content: center;
}

.i-size {
    font-size: 40px;
    padding-bottom: 5px;
}
</style>
