/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

import './assets/css/global.css'
Vue.config.productionTip = false

//把axios挂载到vue原型上
Vue.prototype.$http = axios
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
