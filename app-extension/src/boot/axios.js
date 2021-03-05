import axios from 'axios'
import qs from 'qs'
import mapHeaders from 'quasar-ui-octo-app/src/support/mapHeaders'
import headersDefaults from 'quasar-ui-octo-app/src/support/headersDefaults'

export default ({ store, Vue }) => {
    const api = axios.create({
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
    })

    // Set instance
    Vue.prototype.$axios = axios
    Vue.prototype.$http = api

    // Map headers
    mapHeaders(api, headersDefaults)
}