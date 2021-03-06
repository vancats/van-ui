
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
      {
        path: '/chooseArea',
        name: 'ChooseArea',
        component: () => import('../views/chooseArea/index.vue'),
      },
      {
        path: '/trend',
        name: 'Trend',
        component: () => import('../views/trend/index.vue'),
      },
      {
        path: '/table',
        name: 'Table',
        component: () => import('../views/table/index.vue'),
      },
      {
        path: '/form',
        name: 'Form',
        component: () => import('../views/form/index.vue'),
      },
      {
        path: '/modalForm',
        name: 'ModalForm',
        component: () => import('../views/modalForm/index.vue'),
      },
    ],
  },

]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
