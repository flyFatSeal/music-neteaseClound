module.exports = {
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
}
