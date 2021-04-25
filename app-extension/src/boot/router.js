import appRequester from '../support/appRequester'
import { guard } from 'vue-router-guard'
import guards from '../http/guards'

export default ({ store, router, Vue }) => {
  router.beforeEach(guard((to, from, next) => {
    const middleware = to.meta.middleware || null
    let redirect = false

    // Check if the route guard return a redirect
    if (middleware){
      try {
        redirect = guards[middleware](to, from, next, store)
      }catch (e) {
        console.log('Failed to try go through the gate.', e)
      }
    }

    // Check if is need redirect
    if (redirect) next(redirect)

    // If no redirect initialize the page resource
    if (!redirect)
      appRequester.init({
        to,
        from,
        next,
        redirect,
        Vue
      })
      .then(() => console.log(`navigate to ${to.path} from ${from.path}`))
      .catch((e) => console.log(`navigate error to ${to.path} from ${from.path}`, e))
      .finally(() => next())
  }))
}
