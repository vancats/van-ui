
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import Container from '../component/container/src/index.vue'
import Home from '../views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Container,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/chooseIcon',
        name: 'ChooseIcon',
        component: () => import('../views/chooseIcon/index.vue'),
      },
    ],
  },

]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
