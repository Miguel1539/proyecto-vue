import store from '@/store'
import authApi from '@/apis/authApi'

// export const myAction = async({ commit }) =>{}
export const getMainPost = async ({ commit }, [inicio, fin, searchedUser]) => {
  try {
    // console.log(inicio, fin, searchedUser)
    const config = {
      params: {
        token: store.getters['authModule/getToken'],
        user: store.getters['authModule/getUserName'],
        inicio,
        fin,
        searchedUser
      }
    }
    const { data } = await authApi.get('/post', config)

    if (data.status === 'OK') {
      commit('setPublicaciones', data.result)
      // console.log('ok')
      return false
    } else {
      return true
    }
  } catch (error) {
    console.log(error)
  }
}
export const setLike = async ({ commit }, [id, liked]) => {
  // console.log(id, liked)
  try {
    const response = await authApi.post('/like', {
      user: store.getters['authModule/getUserName'],
      token: store.getters['authModule/getToken'],
      postID: id
    })
    commit('updateLike', liked)
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
    // console.log(response.data.result)
    // if (isSearchedUser) {
    //   commit('setCommentsUserSearched', [response.data.result, index])
    // } else {
    commit('setComments', [response.data.result, index])
    // }
  } catch (error) {
    console.log(error)
  }
}
export const addComment = async (
  { commit },
  [id, index, descripcion]
) => {
  // console.log(id, index, descripcion)

  try {
    const response = await authApi.post('/comment', {
      token: store.getters['authModule/getToken'],
      user: store.getters['authModule/getUserName'],
      comment: descripcion,
      postID: id
    })
    getComments({ commit }, [id, index, 0, 10])
  } catch (error) {
    console.log(error)
  }
}
