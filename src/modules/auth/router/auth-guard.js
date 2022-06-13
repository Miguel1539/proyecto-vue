import store from '@/store'

export const isAuthenticated = async (to, from, next) => {
  // console.log('status')
  const { status } = await store.dispatch('authModule/checkAuthentication')
  // console.log(status)
  if (status === 'success') {
    next()
  } else {
    next({ name: 'auth' })
  }
}
export const isNotAuthenticated = async (to, from, next) => {
  const { status } = await store.dispatch('authModule/checkAuthentication')
  // console.log()
  // next(from.path)
  if (status === 'success') {
    next(from.path)
  }else{
    next()
  }
  // next()
}


