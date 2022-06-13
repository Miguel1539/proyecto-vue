import store from '@/store'
import {ref, onMounted, computed } from '@vue/composition-api'

const useAuth = () => {
  onMounted(() => {
    store.dispatch('profileModule/getProfile')
  })
  const isLoadingFollow = ref(false)
  const follow = async () => {
    isLoadingFollow.value = true
    await store.dispatch('profileModule/followUser',[null])
    isLoadingFollow.value = false
  }
  return {
    isLoadingFollow,
    follow,


    getImgMainProfile: computed(() => {
      // comprobar si exixte una imagen
      if (store.getters['profileModule/getImgMainProfile']) {
        return store.getters['profileModule/getImgMainProfile']
      } else {
        return 'http://projectdaw.duckdns.org:3377/API-REST/img/default/genericUser2.jpg'
      }
    }),
    getImgBanner: computed(() => {
      // comprobar si exixte una imagen
      if (store.getters['profileModule/getImgBanner']) {
        return store.getters['profileModule/getImgBanner']
      } else {
        return 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'
      }
    }),
    getEmail: computed(() => {
      return store.getters['profileModule/getEmail']
    }),

    getImgMainProfileUserSearched: computed(() => {
      // comprobar si exixte una imagen
      if (store.getters['profileModule/getImgMainProfileUserSearched']) {
        return store.getters['profileModule/getImgMainProfileUserSearched']
      } else {
        return 'http://projectdaw.duckdns.org:3377/API-REST/img/default/genericUser2.jpg'
      }
    }),
    getImgBannerUserSearched: computed(() => {
      // comprobar si exixte una imagen
      if (store.getters['profileModule/getImgBannerUserSearched']) {
        return store.getters['profileModule/getImgBannerUserSearched']
      } else {
        return 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'
      }
    }),
    getUserNameUserSearched: computed(() => {
      return store.getters['profileModule/getUserNameUserSearched']
    }),
    getDescripcionUserSearched: computed(() => {
      return store.getters['profileModule/getDescripcionUserSearched']
    }),
    getSeguidores: computed(() => {
      return store.getters['profileModule/getSeguidores']
    }),
    getSeguidos: computed(() => {
      return store.getters['profileModule/getSeguidos']
    }),
    getSeguidoresUserSearched: computed(() => {
      return store.getters['profileModule/getSeguidoresUserSearched']
    }),
    getSeguidosUserSearched: computed(() => {
      return store.getters['profileModule/getSeguidosUserSearched']
    }),
    getIsFollowing: computed(() => {
      return store.getters['profileModule/getIsFollowing']
    })
  }
}

export default useAuth
