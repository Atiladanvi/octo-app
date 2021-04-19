export default ({ store, Vue }) => {
  Vue.prototype.$apiUri = 'http://127.0.0.1:8000/api'
  Vue.prototype.$pusherEnabled = false
  Vue.prototype.$oSidebarMenu = [
    {
      name: 'Components',
      icon: 'widgets',
      path: 'docs/components',
      children: [
        {
          name: 'OTable',
          path: 'table',
        }
      ]
    },
  ]
}
