import VuePusher from 'vue-pusher'

export default ({ store, Vue }) => {
  Vue.use(VuePusher, {
    api_key: process.env.VUE_APP_PUSHER_APP_KEY,
    options: {
      cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
      encrypted: true,
      authEndpoint: `${process.env.VUE_APP_API_URI}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${store.state.auth.token}`
        }
      }
    }
  })
}
