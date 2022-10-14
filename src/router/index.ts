import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import * as consty from '@/types/Const'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/Main.vue'),
    meta: { role: consty.STUDENT },
    children: [
      {
        path: 'student',
        component: () => import('@/views/student/Selection.vue'),
        meta: { role: consty.STUDENT },
      },
      {
        path: 'admin',
        component: () => import('@/views/teacher/Admin.vue'),
        meta: { role: consty.ADMIN },
      },
      {
        path: 'teacher',
        component: () => import('@/views/teacher/Teacher.vue'),
        meta: { role: consty.TEACHER },
      },
    ],
  },
  {
    name: 'nomatch',
    path: '/:pathMatch(.*)*',
    redirect: { name: 'login' },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!to.meta.role) {
    next()
    return
  }

  if (to.meta.role != sessionStorage.getItem('role')) {
    next({ name: 'login' })
    return
  }
  next()
})
export default router
