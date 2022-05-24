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

export const getPostByUsername = async ({ commit }, [inicio, fin]) => {
  try {
    const response = await authApi.get('/post', {
      params: {
        token: store.getters['authModule/getToken'],
        user: store.getters['authModule/getUserName'],
        inicio,
        fin
      }
    })
    // console.log(response.data.status)
    if (response.data.status === 'OK') {
      commit('setPublicaciones', response.data.result)
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
    getPostByUsername({ commit }, [0, 10])
  } catch (error) {
    console.log(error)
  }
}

export const getComments = async ({ commit }, [id, index, inicio, fin]) => {
  // console.log(id)
  try {
    const response = await authApi.get('/comment', {
      params: {
        token: store.getters['authModule/getToken'],
        user: store.getters['authModule/getUserName'],
        id_post: id
      }
    })
    // console.log(response.data)
    commit('setComments', [response.data.result, index])
  } catch (error) {
    console.log(error)
  }
}

export const addComment = async ({ commit }, [id, index, descripcion]) => {
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
    getComments({ commit }, [id, index, 0, 10])
  } catch (error) {
    console.log(error)
  }
}

export const setLike = async ({ commit }, [id_post, index]) => {
  try {
    const response = await authApi.post('/like', {
      user: store.getters['authModule/getUserName'],
      token: store.getters['authModule/getToken'],
      postID: id_post
    })
    // console.log(response)
    // getPostByUsername({ commit }, [0, 10])
    commit('setLike',index)
  } catch (error) {
    console.log(error)
  }
}
