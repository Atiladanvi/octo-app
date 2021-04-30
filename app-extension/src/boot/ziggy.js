import requester from '../support/requester'
import route from 'ziggy-js'
import { Loading } from 'quasar'

export default async ({ Vue }) => {
  Loading.show()
  await requester('GET', 'ziggy')
    .then(response => {
      const Ziggy = response.body
      Vue.prototype.$octo_route = function (name, params, absolute, config = Ziggy) {
        return route(name, params, absolute, config)
      }
    })
    .finally(() => {
      Loading.hide()
    })
}
