// export const myAction = async({ commit }) =>{}
import authApi from '@/apis/authApi'
import store from '@/store'
import router from '@/router'

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
          datos: { email, foto_perfil, username, foto_banner, descripcion, seguidores, seguidos, seguidoresData, seguidosData }
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
    commit('setSeguidores', seguidores)
    commit('setSeguidos', seguidos)
    commit('setSeguidoresData', seguidoresData)
    commit('setSeguidosData', seguidosData)
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

export const updateProfile = async ({ commit }, [valor, opcion]) => {
  // console.log(opcion)
  switch (opcion) {
    case 'descripcion':
      try {
        const response = await authApi.put('/users', {
          token: store.getters['authModule/getToken'],
          user: store.getters['authModule/getUserName'],
          description: valor
        })
        getProfile({ commit })

      } catch (error) {
        console.log(error)
      }
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

export const getPostByUsername = async (
  { commit },
  [inicio, fin, searchedUser]
) => {
  try {
    let config
    if (searchedUser) {
      // console.log('entro')
      config = {
        params: {
          token: store.getters['authModule/getToken'],
          user: store.getters['authModule/getUserName'],
          inicio,
          fin,
          searchedUser
        }
      }
    } else {
      // console.log('entro')
      config = {
        params: {
          token: store.getters['authModule/getToken'],
          user: store.getters['authModule/getUserName'],
          inicio,
          fin
        }
      }
    }
    const response = await authApi.get('/post', config)
    // const { data } = response
    // console.log(response)
    if (response.data.status === 'OK') {
      if (searchedUser) {
        commit('setPublicacionesUserSearched', response.data.result)
      } else {
        commit('setPublicaciones', response.data.result)
      }
      // console.log('ok')
      return false
    } else {
      return true
    }
  } catch (error) {
    console.log(error)
  }
}

export const uploadPost = async ({ commit }, [img, descripcion]) => {
  // preparar la imagen en un formdata
  const formData = new FormData()
  formData.append('imagen', img)
  try {
    const response = await authApi.post('/post', formData, {
      params: {
        token: store.getters['authModule/getToken'],
        user: store.getters['authModule/getUserName'],
        descripcion
      }
    })
    // console.log(response)
    // console.log('entro')
    // commit para limpiar las publicaciones
    commit('clearPublicaciones')
    getPostByUsername({ commit }, [0, 10])
  } catch (error) {
    console.log(error)
  }
}

export const getComments = async (
  { commit },
  [id, index, isSearchedUser, inicio, fin]
) => {
  // console.log(id)
  try {
    const response = await authApi.get('/comment', {
      params: {
        token: store.getters['authModule/getToken'],
        user: store.getters['authModule/getUserName'],
        id_post: id
      }
    })
    // console.log(response.data.result)
    if (isSearchedUser) {
      commit('setCommentsUserSearched', [response.data.result, index])
    } else {
      commit('setComments', [response.data.result, index])
    }
  } catch (error) {
    console.log(error)
  }
}

export const addComment = async ({ commit }, [id, index, descripcion,isSearchedUser]) => {
  // console.log(id, index, descripcion)

  try {
    const response = await authApi.post('/comment', {
      token: store.getters['authModule/getToken'],
      user: store.getters['authModule/getUserName'],
      comment: descripcion,
      postID: id
    })

    // const comment = {
    //   ID_comentario: null,
    //   comentario: descripcion,
    //   publicacion_id: id,
    //   username: store.getters['authModule/getUserName']
    // }

    // console.log(response)
    getComments({ commit }, [id, index,isSearchedUser, 0, 10])
  } catch (error) {
    console.log(error)
  }
}

export const setLike = async ({ commit }, [id_post, index, isSearchedUser]) => {
  try {
    const response = await authApi.post('/like', {
      user: store.getters['authModule/getUserName'],
      token: store.getters['authModule/getToken'],
      postID: id_post
    })
    // console.log(response)
    // getPostByUsername({ commit }, [0, 10])
    if (isSearchedUser) {
      commit('setLikeUserSearched', index)
    } else {
      commit('setLike', index)
    }
  } catch (error) {
    console.log(error)
  }
}

export const searchedUser = async ({ commit }, [username]) => {
  try {
    const { data } = await authApi.get('/users', {
      params: {
        token: store.getters['authModule/getToken'],
        user: store.getters['authModule/getUserName'],
        all: true,
        searchedUser: username
      }
    })
    // console.log(data)
    const {
      result: { error_msg, datos },
      status
    } = data
    // console.log(datos)
    if (
      status === 'error' ||
      datos.username === store.getters['authModule/getUserName']
    ) {
      // redirigir a la ruta profile
      router.push({ name: 'profile' })
    } else {
      commit('setSearchedUser', datos)
      return true
    }
    // commit('setSearchedUser', response.data.result)
  } catch (error) {
    console.log(error)
  }
}

export const followUser = async ({_,dispatch}, [userToFolow]) => {
  // dispatch('searchedUser', [username])
  if (userToFolow != null) {
    try{
      const response = await authApi.post('/follow', {
        token: store.getters['authModule/getToken'],
        user: store.getters['authModule/getUserName'],
        userToFolow
      })
      dispatch('getProfile')
    } catch (error) {
      console.log(error)
    }
  

  }else{
    try {
    const response = await authApi.post('/follow', {
      token: store.getters['authModule/getToken'],
      user: store.getters['authModule/getUserName'],
      userToFolow: store.getters['profileModule/getUserNameUserSearched']
    })
    // console.log(response)
      dispatch('searchedUser', [store.getters['profileModule/getUserNameUserSearched']])

  } catch (error) {
    console.log(error)
  }
    
    
  }
}