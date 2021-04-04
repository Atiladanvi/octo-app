export function token (state) {
  return state.token
}

export function user (state) {
  return state.user
}

export function organizations (state) {
  return state.organizations
}

export function organization (state) {
  return state.organization
}

export function isAuth (state) {
  return !!(state.user && state.token)
}
