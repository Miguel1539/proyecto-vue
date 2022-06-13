export default {
  name: 'main',
  component: () => import('../views/MainView'),
  children: [
    {
      path: '',
      name: 'home',
      component: () => import('../modules/home/views/HomeView')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../modules/profile/views/ProfileView')
    },
    {
      // profile con parametro usuario a mostrar
      path: '/profile-:username',
      name: 'profile-user',
      component: () => import('../modules/profile/views/ProfileView')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../modules/favorites/views/FavoritesView')
    }
  ]
}
