import appRequester from '../support/appRequester'
import { guard } from 'vue-router-guard'

export default ({ router, Vue }) => {
  router.beforeEach(guard((to, from, next) => {
    appRequester.init({
      to,
      from,
      next,
      Vue
    }).then(
      () => console.log(`navigate to ${to.path} from ${from.path}`)
    )
  }))
}
