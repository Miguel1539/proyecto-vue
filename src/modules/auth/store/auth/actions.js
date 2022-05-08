// export const myAction = async({ commit }) =>{}

import authApi from '@/apis/authApi'
import Swal from 'sweetalert2'
import store from '@/store'

export const createUser = async ({ commit }, user) => {
  const { userName, email, password } = user

  try {
    const datos = {
      username: userName,
      email: email,
      password: password
    }

    const response = await authApi.post('/registro', datos)
    const { data } = response
    if (data.status === 'error') {
      Swal.fire({
        title: '¡Error!',
        text: data.result.error_msg,
        icon: 'error'
      })
      return { status: 'error' }
    } else {
      // inicia sesion utilizando el usuario que se registro con la funcion loginUser
      const { status } = await store.dispatch('authModule/loginUser', user)
      return { status }
    }
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

export const loginUser = async ({ commit }, user) => {
  const { userName, password } = user

  try {
    const datos = {
      username: userName,
      password: password
    }
    const response = await authApi.post('/auth', datos)
    const { data } = response
    // console.log(data)
    if (data.status === 'error') {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: data.result.error_msg
      })
      return {
        status: 'error'
      }
    } else {
      // guardar token y username en localstorage
      localStorage.setItem('token', data.result.token)
      localStorage.setItem('userName', datos.username)
      // guardar token y username en store
      commit('setToken', data.result.token)
      commit('setUserName', datos.username)
      return {
        status: 'success'
      }
    }
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}
