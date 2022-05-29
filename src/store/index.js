import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import authModule from '@/modules/auth/store/auth'
import profileModule from '@/modules/main/store/profile'
import listaUsuariosModule from '@/modules/main/store/usuarios'
export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authModule,
    profileModule,
    listaUsuariosModule
  }
})
