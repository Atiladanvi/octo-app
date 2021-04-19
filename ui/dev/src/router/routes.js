const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('pages/Index.vue')
  },
  {
    path: '/docs',
    name: 'docs',
    redirect: 'docs/components',
    component: () => import('layouts/DevLayout.vue'),
    children: [
      {
        path: 'components',
        name: 'components',
        meta: { title: 'Components' },
        redirect: '/docs/components/table',
        component: { render: h => h('router-view') },
        children: [
          {
            path: 'table',
            meta: { title: 'OTable' },
            name: 'app-dev.table.index',
            component: () => import('pages/OTable.vue')
          },
        ]
      }
    ]
  },
]

export default routes
