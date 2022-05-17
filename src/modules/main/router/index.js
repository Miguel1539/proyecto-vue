export default {
  name: 'main',
  component: () => import('../views/MainView'),
  children: [
    {
      path: '',
      name: 'home',
      component: () => import('../modules/home/views/HomeView'),

    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../modules/profile/views/ProfileView')
    }
  ]
}
