import requester from '../support/requester'
import route from 'ziggy-js'

export default async ({ Vue }) => {
  await requester('GET', 'ziggy')
    .then(response => {
      const Ziggy = response.body
      Vue.mixin({
        methods: {
          $octo_route: (name, params, absolute, config = Ziggy) => route(name, params, absolute, config)
        }
      })
    })
}
