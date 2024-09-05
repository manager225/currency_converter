module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    optimization: {
      moduleIds: 'deterministic'
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.runtime.esm-bundler.js'
      }
    },
    output: {
      environment: {
        arrowFunction: false,
        bigIntLiteral: false,
        const: false,
        destructuring: false,
        dynamicImport: false,
        forOf: false,
        module: false
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('vue', 'vue/dist/vue.runtime.esm-bundler.js')
    config.plugin('define').tap((args) => {
      args[0]['process.env'] = {}
      args[0]['__VUE_PROD_DEVTOOLS__'] = false
      args[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = false
      return args
    })
  }
}
