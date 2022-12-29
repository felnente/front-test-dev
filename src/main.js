import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.css'
import VueTheMask from 'vue-the-mask'
import { mask } from 'vue-the-mask'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/pt-br'
import $ from 'jquery'
import Pagination from 'vue-pagination-2'

window.jQuery = $
window.$ = $

Vue.config.productionTip = false

Vue.directive('mask', mask)


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueTheMask)
Vue.component('pagination', Pagination)

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
