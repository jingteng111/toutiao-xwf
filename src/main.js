import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载Vant核心组件库
import Vant from 'vant'

// 加载Vant全局样式
import 'vant/lib/index.css'

import '@/styles/index.less'

Vue.config.productionTip = false

// 注册使用Vant组件库
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
