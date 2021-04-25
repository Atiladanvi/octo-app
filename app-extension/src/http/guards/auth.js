export default (to, from, next, store) => {
  if (!store.getters['auth/isAuth']) return { name: 'app.login' }
  if (store.getters['auth/isAuth'] && to.name === 'app.login') return { name: 'app.dashboard' }
}
