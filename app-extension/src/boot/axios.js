import axios from 'axios'
import qs from 'qs'
import headersDefaults from '../support/headersDefaults'
import mapHeaders from '../support/mapHeaders'

export default ({ store, Vue }) => {
  const api = axios.create({
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    baseURL: Vue.prototype.$apiUri
  })

  // Set instance
  Vue.prototype.$axios = axios
  Vue.prototype.$http = api
  const headers = Vue.prototype.$headers || []
  const mergedHeaders = [...headersDefaults(), ...headers]

  // Map headers
  mapHeaders(api.defaults.headers.common,  mergedHeaders)
}
