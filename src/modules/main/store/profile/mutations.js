// export const myMutation = ( state ) =>{}
// export const myMutation = ( state ) =>{}
export const setUserName = ( state, userName) =>{
    state.username = userName
}
export const setEmail = ( state, email ) =>{
    state.email = email
}
export const setDescipcion = ( state,descipcion  ) =>{
    state.descipcion = descipcion
}
export const setFoto_pertil = ( state,foto_perfil ) =>{
    state.foto_perfil = foto_perfil
}
export const setFoto_banner = ( state,foto_banner ) =>{
    state.foto_banner = foto_banner
}
export const clearProfile = ( state ) =>{
    state.username = null
    state.email = null
    state.descipcion = null
    state.foto_perfil = null
    state.foto_banner = null
}