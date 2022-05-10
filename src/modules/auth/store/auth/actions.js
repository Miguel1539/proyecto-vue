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

export const recoverUserNames = async (_, email) => {
  try {
    //Swall loading
    Swal.fire({
      title: '¡Cargando!',
      text: 'Enviando correo...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    })
    const response = await authApi.get('/recoverUserNames?', {
      params: {
        email: email
      }
    })
    const { data } = response
    if (data.status === 'error') {
      return { status: 'error' }
    } else {
      return { status: 'success' }
    }
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

export const checkUserName = async (_, user) => {
  try {
    Swal.fire({
      title: '¡Cargando!',
      text: 'Enviando correo...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    })
    const { userName } = user
    const response = await authApi.post('/recoverPass', {
      userName
    })
    const { data } = response
    if (data.status === 'error') {
      return {
        status: 'error',
        result: {
          error_msg: data.result.error_msg
        }
      }
    } else {
      return { status: 'success' }
    }
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

export const checkCode = async (_, { userName, code }) => {
  try {
    Swal.fire({
      title: '¡Cargando!',
      text: 'Comprobando código...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    })
    const response = await authApi.get('/recoverPass', {
      params: {
        userName,
        code
      }
    })
    const { data } = response
    if (data.status === 'error') {
      return { status: 'error' }
    } else {
      return { status: 'success' }
    }
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

export const updatePassword = async (_, { userName, newPassword }) => {
  try {
    Swal.fire({
      title: '¡Cargando!',
      text: 'Actualizando contraseña...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    })
    const response = await authApi.put('/recoverPass', {
      userName,
      newPassword
    })
    const { data } = response
    if (data.status === 'error') {
      return { status: 'error' }
    } else {
      return { status: 'success' }
    }
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

export const checkAuthentication = async ({ commit }) => {
  const token = localStorage.getItem('token')
  const userName = localStorage.getItem('userName')
  if (!token || !userName) {
    commit('logout')
    return { status: 'error' }
  }
  try {
    const response = await authApi.get('/auth', {
      params: {
        userName: userName,
        token: token
      }
    })
    const { data } = response
    if (data.status === 'error') {
      commit('logout')
      return { status: 'error' }
    } else {
      commit('setToken', token)
      commit('setUserName', userName)
      return { status: 'success' }
    }
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}
