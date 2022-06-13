// export const myMutation = ( state ) =>{}
// export const myMutation = ( state ) =>{}
export const setUserName = (state, userName) => {
  state.username = userName
}
export const setEmail = (state, email) => {
  state.email = email
}
export const setDescipcion = (state, descipcion) => {
  state.descipcion = descipcion
}
export const setFoto_pertil = (state, foto_perfil) => {
  state.foto_perfil = foto_perfil
}
export const setFoto_banner = (state, foto_banner) => {
  state.foto_banner = foto_banner
}
export const clearProfile = state => {
  // esablecer a null todo el state
  // console.log('clearProfile')

  state.username = null
  state.email = null
  state.descipcion = null
  state.foto_perfil = null
  state.foto_banner = null
  state.publicaciones = []

  state.searchedUser.username = null
  state.searchedUser.descipcion = null
  state.searchedUser.foto_perfil = null
  state.searchedUser.foto_banner = null
  state.searchedUser.publicaciones = []
}
export const clearPublicaciones = state => {
  state.publicaciones = []
}
export const clearPublicacionesUserSearched = state => {
  state.searchedUser.publicaciones = []
}
export const setPublicaciones = (state, publicaciones) => {
  for (const publicacion of publicaciones) {
    state.publicaciones.push(publicacion)
  }
}
export const setPublicacionesUserSearched = (state, publicaciones) => {
  for (const publicacion of publicaciones) {
    state.searchedUser.publicaciones.push(publicacion)
  }
}
export const changeDrawer = (state, index) => {
  state.publicaciones[index].drawer = !state.publicaciones[index].drawer
}
export const changeDrawerUserSearched = (state, index) => {
  state.searchedUser.publicaciones[index].drawer =
    !state.searchedUser.publicaciones[index].drawer
}
export const setComments = (state, [comments, index]) => {
  state.publicaciones[index].comments = comments
}
export const setCommentsUserSearched = (state, [comments, index]) => {
  state.searchedUser.publicaciones[index].comments = comments
}

export const addComment = (state, [index, comment]) => {
  // comprobar si state.publicaciones[index].comments esta vacio
  // console.log(state.publicaciones[index].comments)
  // if (state.publicaciones[index].comments.length === 0) {
  //   state.publicaciones[index].comments.push(comment)
  // } else {
  //   state.publicaciones[index].comments.unshift(comment)
  // }
}

export const setLike = (state, index) => {
  // console.log('state.publicaciones[index].likes)')
  state.publicaciones[index].active = !state.publicaciones[index].active
}
export const setLikeUserSearched = (state, index) => {
  // console.log('setLikeUserSearched')
  state.searchedUser.publicaciones[index].active =
    !state.searchedUser.publicaciones[index].active
}
export const setSearchedUser = (state, datos) => {
  state.searchedUser.username = datos.username
  state.searchedUser.descipcion = datos.descripcion
  state.searchedUser.foto_perfil = datos.foto_perfil
  state.searchedUser.foto_banner = datos.foto_banner
  state.searchedUser.seguidores = datos.seguidores
  state.searchedUser.seguidos = datos.seguidos
  state.searchedUser.isFollowing = datos.isFollowing
}
export const setSeguidores = (state, seguidores) => {
  state.seguidores = seguidores
}
export const setSeguidos = (state, seguidos) => {
  state.seguidos = seguidos
}

export const setSeguidoresData = (state, seguidoresData) => {
  state.seguidoresData = seguidoresData
}
export const setSeguidosData = (state, seguidosData) => {
  state.seguidosData = seguidosData
}

