import Vue from 'vue'
import axios from 'axios'
import MuseUI from 'muse-ui'

import App from './App'
import router from './router'
import store from './store'
import api from './services'
import util from './util'

import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css' // 使用 carbon 主题
import './styles/theme.light.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$util = util

Vue.use(MuseUI)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
