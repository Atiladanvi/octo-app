import requester from '../../support/requester'

export function get ({ commit }) {
  return requester('get', 'notifications')
    .then(function (response) {
      commit('setNotifications', response.body)
    })
}
