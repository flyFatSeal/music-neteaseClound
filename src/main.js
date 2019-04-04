import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import animated from 'animate.css';
import vueg from 'vueg'

Vue.use(vueg, router, {
  duration: 0.3,
  enter: 'slideInRight',
  leave: 'slideInLeft'
})
Vue.use(animated)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
