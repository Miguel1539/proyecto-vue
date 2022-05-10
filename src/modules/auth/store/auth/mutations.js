// export const myMutation = ( state ) =>{}
export const setToken = (state, token) => {
  state.token = token
}
export const setUserName = (state, userName) => {
  state.userName = userName
}

export const logout = (state) => {
  state.token = null
  state.userName = null

  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  
}
