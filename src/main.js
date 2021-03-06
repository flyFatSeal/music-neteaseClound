
// //use cdn

// //import Vue from 'vue'
// // import './cube-ui'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// //import animated from 'animate.css';
// import vueg from 'vueg'
// //import VueLazyLoad from 'vue-lazyload'

// //cdn cube - ui
// Vue.use(window.cube)

// Vue.use(VueLazyload, {
//   loading: require('common/image/default.png')
// })

// Vue.use(vueg, router, {
//   duration: 0.3,
//   enter: 'slideInRight',
//   leave: 'slideInLeft'
// })


// //Vue.use(animated)
// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
//   router,
//   store
// }).$mount('#app')



//normlize


import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
//import animated from 'animate.css';
import vueg from 'vueg'
import VueLazyLoad from 'vue-lazyload'
import WaterDrop from '@/base/waterDrop/waterDrop.js'
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

Vue.use(vueg, router, {
  duration: 0.3,
  enter: 'slideInRight',
  leave: 'slideInLeft'
})

Vue.prototype.$WaterDrop = WaterDrop
//Vue.use(animated)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
