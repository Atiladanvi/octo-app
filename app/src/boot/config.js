import headers from 'src/router/headers'
export default ({ store, Vue }) => {
  Vue.prototype.$apiUri = process.env.VUE_APP_API_URI
  Vue.prototype.$pusherEnabled = true
  Vue.prototype.$headers = headers(store)
  Vue.prototype.$oSidebarMenu = []
}
