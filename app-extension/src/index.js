/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendConf (conf) {
  // register our boot file
  conf.boot.push('~quasar-app-extension-octo-app/src/boot/register.js')

  // make sure axios boot file is registered
  conf.boot.push('~quasar-app-extension-octo-app/src/boot/axios.js')
  conf.boot.push('~quasar-app-extension-octo-app/src/boot/ziggy.js')
  conf.boot.push('~quasar-app-extension-octo-app/src/boot/pusher.js')
  conf.boot.push('~quasar-app-extension-octo-app/src/boot/118n.js')
  conf.boot.push('~quasar-app-extension-octo-app/src/boot/moment.js')

  // make sure boot file transpiles
  // conf.build.transpileDependencies.push(/quasar-app-extension-octo-app[\\/]src[\\/]boot/)

  // make sure the stylesheet goes through webpack to avoid SSR issues
  conf.css.push('~quasar-ui-octo-app/src/index.sass')
}

module.exports = function (api) {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app" CLI
  api.compatibleWith('quasar', '^1.1.1')
  api.compatibleWith('@quasar/app', '^1.1.0 || ^2.0.0')

  // Uncomment the line below if you provide a JSON API for your component
  api.registerDescribeApi('Table', '~quasar-ui-octo-app/src/components/OTable.json')
  // Uncomment the line below if you provide a JSON API for your directive
  api.registerDescribeApi('api-interaction', '~quasar-ui-octo-app/src/directives/apiInteraction.json')

  // We extend /quasar.conf.js
  api.extendQuasarConf(extendConf)
}
