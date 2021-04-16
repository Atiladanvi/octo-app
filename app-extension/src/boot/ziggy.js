import requester from '../support/requester'
import route from 'ziggy-js'

export default async ({ Vue }) => {
   await requester('GET', 'ziggy')
    .then(response => {
      const Ziggy = response.body
      Vue.prototype.$octo_route = function (name, params, absolute, config = Ziggy) {
        return route(name, params, absolute, config)
      }
    })
}
