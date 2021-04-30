import { requester } from './index'
import { LoadingBar } from 'quasar'

LoadingBar.setDefaults({
  color: 'white',
  size: '3px',
  position: 'top'
})

export default {
  async init ({ to, from, next, Vue }) {
    const canBeFetch = Vue.prototype.$octo_route().has(to.name)
    if (canBeFetch) {
      LoadingBar.start()
      await requester('GET', Vue.prototype.$octo_route(to.name))
        .then(response => {
          next.props(response.body)()
        })
        .finally(() =>{
          LoadingBar.stop()
        })
    }
  }
}
