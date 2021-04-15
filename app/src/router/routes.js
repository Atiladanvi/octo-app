import storeVuex from '../store'

const ifNotAuthenticated = (to, from, next) => {
  if (!storeVuex().getters['auth/isAuth']) {
    next()
    return
  }
  next('')
}

const ifAuthenticated = (to, from, next) => {
  if (storeVuex().getters['auth/isAuth']) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    component: () => import('quasar-ui-octo-app/src/layouts/DashboardLayout'),
    beforeEnter: ifAuthenticated
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/login',
    component: () => import('pages/auth/Login.vue'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
