const routes = [
  {
    path: '/',
    component: () => import('layouts/DevLayout.vue'),
    children: [
      {
        path: '/table',
        name: 'app-dev.table.index',
        component: () => import('pages/OTable.vue')
      }
    ]
  }
]

export default routes
