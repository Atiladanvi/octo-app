import { requester } from './index';

export default {
  async init ({ to, from, next, Vue }) {
    const canBeFetch = Vue.prototype.$octo_route().has(to.name)
    if (canBeFetch) {
      await requester('GET', Vue.prototype.$octo_route(to.name))
        .then(response => {
          next.props(response.body)()
        })
    }
    next()
  }
}
