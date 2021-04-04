export default function (store) {
  return [
    {
      'name': 'X-Requested-With',
      'value': 'XMLHttpRequest'
    },
    {
      'name': 'Authorization',
      'value': `Bearer ${store.state.auth.token}`
    },
    {
      'name': 'Ju-App-Key',
      'value': process.env.VUE_APP_API_KEY
    },
    {
      'name': 'Ju-Organizacao-Id',
      'value': store.state.auth.organization ? store.state.auth.organization.id : null
    }
  ]
}
