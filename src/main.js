import Vue from 'vue'
import app from './app.vue'
import { router } from './router'
import { store } from './store'
import './assets/styles/main.scss'
import './registerServiceWorker'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
