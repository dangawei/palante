// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import iviewArea from 'iview-area'
import 'iview/dist/styles/iview.css'
import 'iview/dist/styles/iview.css'
import './css/common.css'
import './css/reset.css'
import api from './api/index.js'
import network from './api/network.js'
import webapi from './api/webapi.js' //里面都是保存缓存参数
import Validate from './js/Validate.js' //里面都是保存缓存参数


Vue.use(iView)
Vue.use(iviewArea)
Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$netcode = network
Vue.prototype.$webapi = webapi
Vue.prototype.$Validate = Validate
Vue.prototype.$webcommon =  process.env.API_ROOT_URL
Vue.prototype.$webapicommon = process.env.API_ROOT
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
