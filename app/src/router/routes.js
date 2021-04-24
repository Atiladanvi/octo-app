const routes = [
  {
    path: '/',
    name: 'app.dashboard',
    component: () => import('quasar-ui-octo-app/src/layouts/DashboardLayout'),
    meta: {
      middleware: 'auth'
    }
  },
  {
    path: '/login',
    name: 'app.login',
    component: () => import('pages/auth/Login.vue'),
    meta: {
      middleware: 'web'
    }
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
    meta: {
      middleware: 'web'
    }
  }
]

export default routes
