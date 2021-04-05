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
      'name': 'Octo-App-Key',
      'value': process.env.VUE_APP_API_KEY
    }
  ]
}
