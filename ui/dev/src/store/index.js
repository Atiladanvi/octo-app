import Vue from 'vue'
import Vuex from 'vuex'
import auth from 'quasar-app-extension-octo-app/src/store/auth'
import notifications from 'quasar-app-extension-octo-app/src/store/notifications'
import VuexPersistence from 'vuex-persist'
import settings from 'quasar-app-extension-octo-app/src/store/settings'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  return new Vuex.Store({
    modules: {
      auth,
      notifications,
      settings
    },
    plugins: [new VuexPersistence().plugin],
    strict: process.env.DEV
  })
}
