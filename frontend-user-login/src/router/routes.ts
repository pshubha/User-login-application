import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/LoginPage.vue') },
      { path: '/register', component: () => import('components/RegisterPage.vue') },
      { path: '/admin', component: () => import('components/AdminUserListPage.vue') },
      { path: '/user', component: () => import('components/UserPage.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
