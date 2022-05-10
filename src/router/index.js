import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import MainView from '../modules/main/views/MainView.vue'

import authRouter from '@/modules/auth/router'
import mainRouter from '@/modules/main/router' 



import {
  isAuthenticated,
  isNotAuthenticated
} from '@/modules/auth/router/auth-guard.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main',
    // beforeEnter: isAuthenticated,
    // component: HomeView
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   beforeEnter: isNotAuthenticated,
  //   component: () => import(/* webpackChunkName: "about" */ '../modules/main/views/MainView.vue')
  // },
  {
    //routa alternativa prubas mainView
    path: '/main',
    beforeEnter: isAuthenticated,
    ...mainRouter
    // component: () => import(/* webpackChunkName: "main" */ '../modules/main/views/MainView.vue')
  },
  {
    path: '/about',
    name: 'about',
    beforeEnter: isAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    //esto va a ir fuera a un modulo de rutas
    path: '/auth',
    beforeEnter: isNotAuthenticated,
    ...authRouter
  },
  {
    //todas las rutas que no existen se van a /auth
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
