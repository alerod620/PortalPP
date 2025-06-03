/*!

 =========================================================
 * Vue Paper Dashboard - v1.0.1
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2023 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App";
import router from "./router/index";
import axios from 'axios';
import VueAxios from 'vue-axios';

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


// Vuesax Component Framework
import Vuesax from 'vuesax'
// import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax

import 'devextreme/dist/css/dx.light.css';

import './input.css'

library.add(fas);
library.add(far);
library.add(fab);

Vue.component('font-awesome-icon', FontAwesomeIcon);



import config from 'devextreme/core/config';

import esMessages from "devextreme/localization/messages/es.json";
import { locale, loadMessages } from "devextreme/localization";


import './assets/tailwind.css'




// Configurar interceptor de axios
axios.interceptors.response.use(
  (response) => {
    console.log(response)
    // Si la respuesta tiene código 0, es exitosa
    if (response.data && response.data.codigo === 0 && response.data.descripcion) {
      Vue.prototype.$vs.notify({
        color: 'success',
        title: 'Éxito',
        text: response.data.descripcion || 'Operación exitosa'
      });
    }
    return response;
  },
  (error) => {
    // Manejar errores
    const responseData = error.response && error.response.data || {};
    
    Vue.prototype.$vs.notify({
      color: 'danger',
      title: 'Error',
      text: responseData.descripcion || 'Ha ocurrido un error'
    });
    
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.use(PaperDashboard);

Vue.use(Vuesax, {
  /* I will include options later */
});

/* eslint-disable no-new */
new Vue({
  router,
  render: (h) => h(App),

  created()
  {
    Vue.prototype.$vs = this.$vs
    loadMessages(esMessages);
    locale(navigator.language);
  },
}).$mount("#app");

