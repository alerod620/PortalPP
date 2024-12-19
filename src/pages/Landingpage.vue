<template>
<div>
    <DxTabs :selected-index="SelectedOption" height="10%" width="100%" :rtl-enabled="false" orientation="horizontal" styling-mode="secondary" :icon-position="'top'" :show-nav-buttons="true" :scroll-by-content="true" @item-click="(e)=>{ this.SelectedOption = e.itemIndex }">
        <DxItem v-for="(item, index) in buttons" :key="index" template="tabButton" />
        <template #tabButton="{index}">
            <div>
                <div v-if="index < 4" style="display: flex; place-items: center">
                    <font-awesome-icon :icon="['fas', buttons[index].icon]" style="font-size: 30px;" />
                    <span class="ml-2" style="font-size: 16px;">{{buttons[index].name}}</span>

                </div>
                <vs-dropdown v-else style="width: 150px;">
                    <font-awesome-icon :icon="['fas', buttons[index].icon]" style="font-size: 30px;" />
                    <span class="ml-2" style="font-size: 16px;">{{buttons[index].name}}</span>
                    <vs-dropdown-menu>
                        <vs-dropdown-item>
                            Datos personales
                        </vs-dropdown-item>
                        <vs-dropdown-item divider>
                            Historial de citas
                        </vs-dropdown-item>
                        <vs-dropdown-item divider>
                            Cerrar Sesión
                        </vs-dropdown-item>
                        <vs-dropdown-item divider>
                            Ayuda
                        </vs-dropdown-item>
                    </vs-dropdown-menu>
                </vs-dropdown>
            </div>
        </template>
    </DxTabs>
    <div clas="p-2">
        <card>
            <div v-if="SelectedOption == 0">
                <vs-col class="p-4" style="display: flex; flex-wrap: wrap; justify-content: center;">
                    <div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/4">
                        <img src="@/assets/img/logo-usac-negro.png" width="auto" height="auto">
                    </div>
                    <div class="w-full sm:w-1/2 md:w-3/4 lg:w-3/4">
                        <span style="font-size: 24px;">El Plan de Prestaciones es una dependencia de servicio de la Universidad de San Carlos de Guatemala, responsable de proteger a afiliados y afiliadas, mediante el otorgamiento de prestaciones y desarrollo de programas de beneficio social, tales como: pensión por edad de retiro, pensión por tiempo de servicio, pensión por jubilación escalonada, pensión por invalidez, pensión por orfandad, pensión por viudez, seguro de vida, compensación económica, retiro definitivo y tiempo de servicio.</span>
                    </div>
                </vs-col>
            </div>

            <div v-if="SelectedOption == 1">
                <div>
                    <span style="font-size: 36px; font-weight: bold;">Misión</span><br>
                    <span style="font-size: 22px;">Somos una dependencia con personal calificado, con mística de trabajo y alto compromiso de servicio; responsable de asegurar y proteger a los afiliados al Plan de Prestaciones de la Universidad de San Carlos de Guatemala, mediante el otorgamiento de prestaciones de manera eficaz y eficiente. Así como del desarrollo permanente de programas de beneficio social.</span>
                </div>

                <div class="mt-4">
                    <span style="font-size: 36px; font-weight: bold;">Visión</span><br>
                    <span style="font-size: 22px;">Ser una dependencia de servicio, con un equipo de trabajo profesional, que posea alta sensibilidad social, calificado y tecnificado, con el objetivo de aumentar las prestaciones y ampliar los beneficios que permitan contribuir a mejorar la calidad de vida de los afiliados al Plan de Prestaciones de la Universidad de San Carlos de Guatemala.</span>
                </div>
            </div>

            <div v-if="SelectedOption == 2">
                <Publicaciones :modulo="2" />
            </div>

            <div v-if="SelectedOption == 4">
                <Login height="100%" />
            </div>
        </card>
    </div>

</div>
</template>

<script>
import {
    DxTabs,
    DxItem
} from 'devextreme-vue/tabs';

import 'devextreme-vue/text-area'

import Publicaciones from "@/pages/Publicaciones.vue";
import Login from "@/pages/Login.vue";

export default {
    name: 'Modulos',
    components: {
        DxTabs,
        DxItem,
        Publicaciones,
        Login
    },
    data() {
        return {
            solicitudes: [],
            moduloActivo: {},

            SelectedOption: 0,

            visualizarModulo: false,

            buttons: [{
                    name: 'Inicio',
                    icon: 'home',
                    value: 1,
                }, {
                    name: 'Nosotros',
                    icon: 'people-group',
                    value: 2,
                }, {
                    name: 'Circulares',
                    icon: 'newspaper',
                    value: 3,
                },
                {
                    name: 'Contáctenos',
                    icon: 'comment-dots',
                    value: 4,
                },
                {
                    name: 'Iniciar sesión',
                    icon: 'user',
                    value: 5,
                }
            ]
        }
    },
    methods: {
        cargarPermisos() {
            this.solicitudes = [{
                    Id: 1,
                    Nombre: 'Viudo',
                    Descripcion: 'Usuarios beneficiarios por la muerte de su cónyugue',
                },
                {
                    Id: 2,
                    Nombre: 'Usuarios',
                    Descripcion: 'Usuarios beneficiarios por la muerte de un padre',
                },
                {
                    Id: 3,
                    Nombre: 'Trabajdor',
                    Descripcion: 'Usuario que aporta al plan de prestaciones',
                },
                {
                    Id: 4,
                    Nombre: 'Jefe',
                    Descripcion: 'Usuario que puede los reportes del sistema',
                }
            ]
        },
    },
    mounted() {
        this.cargarPermisos()
    }
}
</script>

<style>
.barra {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: -webkit-sticky !important;
    /* for browser compatibility */
    position: sticky !important;
    top: 0px;
    background-color: #01264e;
    z-index: 1000;
}

.espacioBoton {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.botonLanding {
    background: white !important;
    width: 150px;
}

.con-vs-dropdown--menu.vs-dropdown-menu {
    width: 150px !important;
}

.vs-dropdown--menu--after {
    right: 70px !important;
}
</style>
