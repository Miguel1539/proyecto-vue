// export const myMutation = ( state ) =>{}
export const setPublicaciones = (state, publicaciones) => {
    for (const publicacion of publicaciones) {
        state.publicaciones.push(publicacion)
      }
}
export const clearPosts = (state) => {
  state.publicaciones = []
}
export const updateLike = (state, liked) => {
  state.publicaciones[liked].active = !state.publicaciones[liked].active
}
export const setComments = (state, [comments, index]) => {
  state.publicaciones[index].comments = comments
}
export const changeDrawer = (state, index) => {
  state.publicaciones[index].drawer = !state.publicaciones[index].drawer
}