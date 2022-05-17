// export const myAction = async({ commit }) =>{}
import authApi from '@/apis/authApi'
import store from '@/store'

export const getProfile = async ({ commit }) => {
  try {
    const response = await authApi.get('/users', {
      params: {
        token: store.getters['authModule/getToken'],
        user: store.getters['authModule/getUserName'],
        all: true
      }
    })
    const {
      data: {
        result: {
          datos: { email, foto_perfil, username, foto_banner, descripcion }
        }
      }
    } = response
    // comprobar si el usuario tiene foto_perfil, foto_banner y descripcion
    if (foto_perfil) {
      commit('setFoto_pertil', foto_perfil)
    }
    if (foto_banner) {
      commit('setFoto_banner', foto_banner)
    }
    if (descripcion) {
      commit('setDescipcion', descripcion)
    }
    commit('setEmail', email)
    commit('setUserName', username)
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

export const updateProfile = async ({ commit }, [valor, opcion]) => {
  // console.log(opcion)
  switch (opcion) {
    case 'descripcion':
      break
    case 'avatar':
      // preparar la imagen en un formdata
      const formData = new FormData()
      formData.append('imagen', valor)
      try {
        // console.log('entro')
        const response = await authApi.post('/users', formData, {
          params: {
            token: store.getters['authModule/getToken'],
            act: 'mainprofile',
            user: store.getters['authModule/getUserName']
          }
        })
        // console.log(response)
        getProfile({ commit })
      } catch (error) {
        console.log(error)
      }
      break
    case 'banner':
      // preparar la imagen en un formdata
      const formData2 = new FormData()
      formData2.append('imagen', valor)
      try {
        // console.log('entro')
        const response = await authApi.post('/users', formData2, {
          params: {
            token: store.getters['authModule/getToken'],
            act: 'bannerprofile',
            user: store.getters['authModule/getUserName']
          }
        })
        // console.log(response)
        getProfile({ commit })
      } catch (error) {
        console.log(error)
      }
      break
  }
}
