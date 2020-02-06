// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import store from './store'
import router from './router'
import VueJwtDecode from 'vue-jwt-decode'
import forageHelper from './helper/localForageHelper';
import { Pagination } from 'bootstrap-vue/es/components'
import panZoom from 'vue-panzoom'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// todo
const plugin = {
  install () {
      Vue.forage = forageHelper
  }
}
// cssVars()
Vue.config.productionTip = false;
Vue.use(BootstrapVue)
Vue.use(VueJwtDecode)
Vue.use(plugin)
Vue.use(Pagination)
Vue.use(panZoom)

// Vue.use(ElementUI)
console.log(process.env.NODE_ENV)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  VueJwtDecode,
  template: '<App/>',
  components: {
    App
  }
})
