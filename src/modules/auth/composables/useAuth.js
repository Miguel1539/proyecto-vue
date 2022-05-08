import { ref } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
import Swal from 'sweetalert2'
const useAuth = () => {
  const formLogin = ref({
    userName: '',
    password: ''
  })
  const formRegister = ref({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAndConditions: false
  })

  const rulesLogin = ref({
    userName: [
      v => !!v || 'El nombre de usuario es obligatorio',
      v =>
        v.length >= 3 || 'El nombre de usuario debe tener al menos 3 caracteres'
    ],
    password: [v => !!v || 'La contraseña es obligatoria']
  })

  const rulesRegister = ref({
    userName: [
      v => !!v || 'El nombre es obligatorio',
      v => v.length >= 3 || 'El nombre debe tener al menos 3 caracteres',
      v => v.length <= 50 || 'El nombre debe tener menos de 50 caracteres'
    ],
    email: [
      v => !!v || 'El correo es obligatorio',
      v => /.+@.+\..+/.test(v) || 'El correo debe ser valido'
    ],
    password: [
      v => !!v || 'La contraseña es obligatoria',
      v => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
      v => v.length <= 22 || 'La contraseña debe tener menos de 22 caracteres'
    ],
    confirmPassword: [
      v => !!v || 'La confirmación de contraseña es obligatoria',
      v => v === formRegister.value.password || 'Las contraseñas no coinciden'
    ],
    termsAndConditions: [v => !!v || 'Debe aceptar los términos y condiciones']
  })

  const validateLogin = async boolean => {
    if (boolean) {
      // console.log('login')
      isLoading.value = true
      await handleLogin()
      isLoading.value = false
    }
  }
  const validateRegister = async boolean => {
    if (boolean) {
      isLoading.value = true
      await handleRegister()
      // simular http request
      // setTimeout(() => {
      //   isLoading.value = false
      // } , 2000)
      isLoading.value = false
    }
  }

  const handleRegister = async () => {
    const user = {
      ...formRegister.value
    }
    // console.log(store.state.authModule)
    // console.log(...mapActions['authModule'])
    const { status } = await store.dispatch('authModule/createUser', user)
    if (status === 'success') {
      router.push('/')
    }
    // store.dispatch('auth/createUser', user)
  }
  const handleLogin = async () => {
    const user = {
      ...formLogin.value
    }
    const { status } = await store.dispatch('authModule/loginUser', user)
    if (status === 'success') {
      // console.log('login success')
      router.push('/')
    }
  }
  const recoverPassword = () => {
    // pedir nombre de usuario para recuperar contraseña
    Swal.fire({
      title: '¿Quieres recuperar tu contraseña?',
      text: 'Ingresa tu nombre de usuario',
      input: 'text',
      inputPlaceholder: 'Nombre de usuario',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then(async result => {
      if (result.value) {
        const userName = result.value
        const response = await store.dispatch(
          'authModule/recoverPassword',
          userName
        )
        if (response.status === 'success') {
          Swal.fire({
            title: '¡Listo!',
            text: 'Se ha enviado un correo a tu cuenta',
            icon: 'success'
          })
        } else {
          Swal.fire({
            title: '¡Error!',
            text: 'El nombre de usuario no existe',
            icon: 'error'
          })
        }
      }
    })
  }

  const validLogin = ref(true)
  const validRegister = ref(true)
  const isLoading = ref(false)
  return {
    step: 2,
    isLoading,
    formLogin,
    formRegister,
    rulesLogin,
    rulesRegister,
    validLogin,
    validRegister,

    validateRegister,
    validateLogin,

    recoverPassword
  }
}
export default useAuth
