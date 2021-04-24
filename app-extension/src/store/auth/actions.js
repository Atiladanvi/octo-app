import { requester } from 'quasar-app-extension-octo-app/src/support'
import { API_ROUTE_LOGOUT, API_ROUTE_LOGIN } from './consts'

export function login ({ commit }, credentials) {

  return new Promise((resolve, reject) => {
    requester('post', API_ROUTE_LOGIN, credentials)
      .then((response) => {
        commit('initSession', response.body.data)
        resolve(resolve)
      }).catch(error => {
        reject(error)
      })
  })
}

export async function logout ({ commit }) {
  return requester('delete', API_ROUTE_LOGOUT)
    .then(() => {
    }).catch(() => {
    }).finally(() => {
      commit('resetSession')
    })
}
