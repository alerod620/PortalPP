<template>
<div>
    <card title="Solicitudes">
        <div class="row p-2" style="display: grid; place-items: center;">
            <DxCircularGauge id="gauge" :value="aportaciones" :subvalues="[aportaciones]">
                <DxScale :start-value="0" :end-value="400" :tick-interval="50" >
                    <DxLabel :customize-text="customizeText" />
                </DxScale>
                <DxSubvalueIndicator type="textCloud">
                    <DxText :format="format" :customize-text="customizeText" />
                </DxSubvalueIndicator>
                <DxExport :enabled="true" />
                <DxTitle text="Aportaciones al Plan de Prestaciones">
                    <DxFont :size="28" />
                </DxTitle>
            </DxCircularGauge>
            <!-- <span style="font-size: 28px;">
                Has realizado <span style="font-weight: bold;">{{ this.aportaciones }}</span> aportaciones al Plan de Prestaciones.
            </span> -->
        </div>
    </card>
</div>
</template>

<script>
import {
    DefaultDxGridConfiguration
} from './data'

import {
    DxCircularGauge,
    DxScale,
    DxLabel,
    DxSubvalueIndicator,
    DxText,
    DxExport,
    DxTitle,
    DxFont,
} from 'devextreme-vue/circular-gauge';

const format = {
    type: 'fixedPoint',
};

const customizeText = ({ valueText }) => `${valueText} aportaciones`;

export default {
    name: 'Solicitudes',
    components: {
        DxCircularGauge,
        DxScale,
        DxLabel,
        DxSubvalueIndicator,
        DxText,
        DxExport,
        DxTitle,
        DxFont,
    },
    data() {
        return {
            DefaultDxGridConfiguration,
            format,
            customizeText,
            solicitudes: [],
            solicitudActiva: {},

            visualizarSolicitud: false,

            aportaciones: 125,

            textAportaciones: ''
        }
    },
    methods: {
        cargarUsuarios() {

        },
    },
    mounted() {
        this.textAportaciones = this.aportaciones + ' aportaciones'
        // this.cargarUsuarios()
    }
}
</script>

<style scoped>
#gauge {
    height: 440px;
    width: 100%;
}

.description {
    filter: drop-shadow(0 2px 2px rgb(0 0 0 / 0.16));
}
</style>
