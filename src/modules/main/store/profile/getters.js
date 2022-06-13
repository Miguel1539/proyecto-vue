// export const myGetter = state => state.myState
// export const myGetter = state => state.myState
export const getImgMainProfile = state => state.foto_perfil
export const getImgBanner = state => state.foto_banner
export const getDescripcion = state => state.descipcion
export const getUserName = state => state.username
export const getEmail = state => state.email
export const getPublicaciones = state => state.publicaciones
export const getImgMainProfileUserSearched = state => state.searchedUser.foto_perfil
export const getImgBannerUserSearched = state => state.searchedUser.foto_banner
export const getDescripcionUserSearched = state => state.searchedUser.descipcion
export const getUserNameUserSearched = state => state.searchedUser.username
export const getPublicacionesUserSearched = state => state.searchedUser.publicaciones
export const getSeguidores = state => state.seguidores
export const getSeguidos = state => state.seguidos
export const getSeguidoresUserSearched = state => state.searchedUser.seguidores
export const getSeguidosUserSearched = state => state.searchedUser.seguidos
export const getIsFollowing = state => state.searchedUser.isFollowing
export const getSeguidoresData = state => state.seguidoresData
export const getSeguidosData = state => state.seguidosData