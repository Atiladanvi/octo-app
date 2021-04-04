import Vue from 'vue'
import sleep from '../../support/sleep'

export function user (state, user) {
  state.user = user
}

export function token (state, token) {
  state.token = token
}

export async function resetSession (state) {
  state.user = null
  state.token = ''
  await sleep(1000)
}

export function initSession (state, data) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
  Vue.prototype.$pusher.config.auth.headers['Authorization'] = `Bearer ${data.token}`
  state.user = data.user
  state.token = data.token
}
