import 'vuetify/dist/vuetify.css'
import 'typeface-roboto'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import router from './router'
import filters from './filters'
import store from './store'
import directives from './directives'
import App from './components/app'

// Installer use
Vue.use(Vuex)
Vue.use(VuePerfectScrollbar)
Vue.use(Vuetify)
Vue.use(App)

Vue.config.productionTip = true

new Vue({
  el: '#root',
  template: '<App/>',
  store,
  router,
  filters,
  directives,
  components: { App }
})
