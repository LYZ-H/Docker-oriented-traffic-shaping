import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify';
Vue.use(VueAxios, axios)
Vue.config.productionTip = true


new Vue({
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
