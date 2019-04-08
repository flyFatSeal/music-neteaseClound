
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
  //   const cdn = {
  //     css: [

  //     ],
  //     js: [
  //     ]
  //   }
  //   config.plugin('html')
  //     .tap(args => {
  //       args[0].cdn = cdn
  //       return args
  //     })
  //   // #endregion

  // }
}
