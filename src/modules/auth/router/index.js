export default {
  name: 'auth',
  component: () => import(/* webpackChunkName: "auth" */ '@/modules/auth/views/AuthView.vue')
}