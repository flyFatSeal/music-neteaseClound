module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'views': '@/views',
        'common': '@/common',
        'api': '@/api',
        'base': '@/base'
      }
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
  // chainWebpack: config => {
  //   var externals = {
  //     'vue': 'Vue',
  //     'axios': 'axios',
  //     'vue-router': 'VueRouter',
  //     'vuex': 'Vuex',
  //     'cube-ui': 'cube',
  //     'vue-lazyload': 'VueLazyload',
  //     'better-scroll': 'better-scroll'
  //   }
  //   config.externals(externals)
  //   // const cdn = {
  //   //   css: [
  //   //     '//cdn.bootcss.com/animate.css/3.7.0/animate.min.css',
  //   //     '//unpkg.com/cube-ui/lib/cube.min.css'
  //   //   ],
  //   //   js: [
  //   //     // vue
  //   //     '//cdn.bootcss.com/vue/2.6.10/vue.runtime.min.js',
  //   //     // vue-router
  //   //     '//cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js',
  //   //     // vuex
  //   //     '//cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
  //   //     // axios
  //   //     '//cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
  //   //     // cube-ui js
  //   //     '//unpkg.com/cube-ui/lib/cube.min.js',
  //   //     // better-scroll js
  //   //     '//unpkg.com/better-scroll/dist/bscroll.min.js',
  //   //     //vue-lazyLoad js
  //   //     '//cdn.bootcss.com/vue-lazyload/1.2.6/vue-lazyload.js'
  //   //   ]
  //   // }
  //   // config.plugin('html')
  //   //   .tap(args => {
  //   //     args[0].cdn = cdn
  //   //     return args
  //   //   })

  // }
}
