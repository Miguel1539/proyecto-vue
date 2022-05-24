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
  state.username = null
  state.email = null
  state.descipcion = null
  state.foto_perfil = null
  state.foto_banner = null
}
export const setPublicaciones = (state, publicaciones) => {
  for (const publicacion of publicaciones) {
    state.publicaciones.push(publicacion)
  }
}

export const changeDrawer = (state, index) => {
  state.publicaciones[index].drawer = !state.publicaciones[index].drawer
}

export const setComments = (state, [comments, index]) => {
  state.publicaciones[index].comments = comments
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
  state.publicaciones[index].active = !state.publicaciones[index].active
}
