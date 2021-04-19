// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

const path = require('path')

require('dotenv').config()

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'config.js'
    ],

    css: [
      'app.sass'
    ],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack
      config: {},

      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: '',

      // Quasar plugins
      plugins: []
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history',

      env: {
        VUE_APP_NAME: process.env.VUE_APP_NAME,
        VUE_APP_DESCRIPTION: process.env.VUE_APP_DESCRIPTION,
        VUE_APP_AUTHOR: process.env.VUE_APP_AUTHOR,
        VUE_APP_API_URI: process.env.VUE_APP_API_URI,
        VUE_APP_API_KEY: process.env.VUE_APP_API_KEY,
        VUE_APP_PUSHER_APP_KEY: process.env.VUE_APP_PUSHER_APP_KEY,
        VUE_APP_PUSHER_APP_CLUSTER: process.env.VUE_APP_PUSHER_APP_CLUSTER,
        VUE_ROUTER_MODE: process.env.VUE_ROUTER_MODE
      },

      chainWebpack (chain) {
        chain.resolve.alias.merge({
          'ui': path.resolve(__dirname, '../src/index.js')
        })
      }
    },

    devServer: {
      // port: 8080,
      open: true // opens browser window automatically
    },
  }
}
