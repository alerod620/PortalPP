<template>
    <div>
        <div class="title">
            Menú Modulo de Certificaciones y Solvencias
            <hr>
        </div>

        <div class="contentMenu">
            <div class="buttons">

                <div class="p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 div-button" v-for="(item, index) in menu"
                    v-bind:key="index">
                    <vs-button class="button" color="dark" type="border" @click.native="OpcionSeleccionada(item)">

                        <div>
                            <font-awesome-icon :icon="['fas', item.icon]" class="i-size" />
                        </div>
                        <span>{{ item.text }}</span>
                    </vs-button>
                </div>
            </div>
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
                text: "Usuario",
                icon: "users",
                path: "/usuarios",
            },
            {
                id: 2,
                text: "Solicitud Solvencias",
                icon: "newspaper",
                path: "/usuarios",
            },
            {
                id: 3,
                text: "Solicitud Certificacion",
                icon: "file-circle-check",
                path: "/solicitudCertificaciones",
            },
            {
                id: 4,
                text: "Solicitudes Nuevas",
                icon: "file-import",
                path: "/revisionSolicitudes",
            },
            
            {
                id: 7,
                text: "Seguimiento",
                icon: "list-check",
                path: "/solicitudesUsuario",
            },
            {
                id: 8,
                text: "",
                icon: "",
                path: "/",
            },
            ]
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

.title {
    font-size: xx-large;
    text-align: center;
    color: #0B355B;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

hr {
    border: none;
    /* Quita el borde por defecto */
    height: 2px;
    /* Altura de la línea */
    background-color: #0B355B;
    /* Color de la línea */
    margin: 20px 0;
    /* Márgenes superior e inferior */
    margin-left: 3%;
    margin-right: 3%;
}

.contentMenu{
    margin-left: 2%;
    margin-right: 2%;
    border: 1px solid #0B355B;
    border-radius: 15px; /* Esquinas redondeadas, ajusta el valor para más o menos redondeo */
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5); 
}
</style>