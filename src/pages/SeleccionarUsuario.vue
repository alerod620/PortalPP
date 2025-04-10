<template>
<div class="buttons">
    <div class="p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 div-button" v-for="(item, index) in usuarios" v-bind:key="index">
        <vs-button class="button" color="dark" type="border" @click.native="seleccionarUsuario(item)">
            <div>
                <font-awesome-icon :icon="['fas', 'child']" class="i-size" v-if="item.TipoUsuario.Nombre == 'Huerfano'" />
                <font-awesome-icon :icon="['fas', 'user-clock']" class="i-size" v-if="item.TipoUsuario.Nombre == 'Jubilado'" />
                <font-awesome-icon :icon="['fas', 'heart-crack']" class="i-size" v-if="item.TipoUsuario.Nombre == 'Viudo'" />
                <font-awesome-icon :icon="['fas', 'user-tie']" class="i-size" v-if="item.TipoUsuario.Nombre == 'Administrador'" />
            </div>
            <span>{{item.TipoUsuario.Nombre}}</span>
        </vs-button>
    </div>
</div>
</template>

<script>
export default {
    props: {
        usuarios: null
    },
    data() {
        return {}
    },
    methods: {
        seleccionarUsuario(item) {
            localStorage.setItem("usuarioActivo", JSON.stringify({
                ...item
            }));
            this.$emit("usuarioSeleccinado", true);
            location.reload();
        },
    },
};
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
