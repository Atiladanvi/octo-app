export function token (state) {
  return state.token
}

export function user (state) {
  return state.user
}

export function isAuth (state) {
  return !!(state.user && state.token)
}
