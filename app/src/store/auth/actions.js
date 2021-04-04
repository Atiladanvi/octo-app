import requester from '../../support/requester'
import { API_ROUTE_LOGOUT } from './consts'

export function login ({ commit }, credentials) {
  return new Promise((resolve, reject) => {
    requester('post', 'auth/login', credentials)
      .then((response) => {
        commit('initSession', response.body.data)
        resolve(resolve)
      }).catch(error => {
        reject(error)
      })
  })
}

export function register ({ commit }, data) {
  return new Promise((resolve, reject) => {
    requester('post', 'auth/register', data)
      .then((response) => {
        commit('initSession', response.body.data)
        resolve(response)
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
