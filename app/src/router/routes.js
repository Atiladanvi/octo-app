
const routes = [
  {
    path: '/',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/login',
    component: () => import('pages/auth/Login.vue')
  },
  {
    path: '/register/:token',
    component: () => import('pages/auth/RegisterWithToken.vue')
  },
  {
    path: '/register',
    component: () => import('pages/auth/Register.vue')
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
