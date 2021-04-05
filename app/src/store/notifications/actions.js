import { requester } from 'quasar-app-extension-octo-app/src/support'

export function get ({ commit }) {
  return requester('get', 'notifications')
    .then(function (response) {
      commit('setNotifications', response.body)
    })
}
