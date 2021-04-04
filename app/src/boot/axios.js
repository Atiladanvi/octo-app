import axios from 'axios'
import qs from 'qs'
import mapHeaders from '../support/mapHeaders'
import headers from '../router/headers'

export default ({ store, Vue }) => {
  const api = axios.create({
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
  api.defaults.baseURL = process.env.VUE_APP_API_URI
  mapHeaders(api.defaults.headers.common, headers(store))
  Vue.prototype.$headers = headers(store)
  Vue.prototype.$apiUri = process.env.VUE_APP_API_URI
  Vue.prototype.$axios = axios
  Vue.prototype.$http = api
}
