
const routes = [
  { path: '/', redirect: '/dashboard' },

  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: 'redirect', name: 'redirect', component: () => import('pages/Redirect') }
    ],
    meta: {
      requiresAuth: true,
      requiresREAL: false
    }
  },

  {
    path: '/',
    component: () => import('layouts/admin'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/Dashboard') },
      { path: 'users', name: 'users', component: () => import('pages/Users') },
      { path: 'settings', name: 'rsettings', component: () => import('pages/Settings') }
    ],
    meta: {
      requiresAuth: true,
      requiresREAL: true
    }
  },

  {
    path: '/login',
    component: () => import('layouts/default'),
    children: [
      { path: '', name: 'login', component: () => import('pages/Login') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
