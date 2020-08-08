/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

import './assets/css/global.css'
Vue.config.productionTip = false


//配置请求根路径
axios.defaults.baseURL = '127.0.0.1:3000/'
//把axios挂载到vue原型上
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
