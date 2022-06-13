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
      v => v.length <= 50 || 'El nombre debe tener menos de 50 caracteres',
      v => !v.includes(' ') || 'El nombre no puede contener espacios'
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
      router.push('/main')
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
      router.push('/main')
    }
  }
  const recoverPassword = () => {
    // preguntar nombre de usuario para recuperar contraseña
    Swal.fire({
      title: '¡Recuperar contraseña!',
      text: 'Ingrese su nombre de usuario',
      input: 'text',
      inputPlaceholder: 'Nombre de usuario',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      // validar que no sea nulo
      inputValidator: value => {
        if (!value) {
          return 'El nombre de usuario es obligatorio'
        }
      },
      allowOutsideClick: false
    }).then(async resultado => {
      if (resultado.value) {
        const { status, result } = await store.dispatch(
          'authModule/checkUserName',
          {
            userName: resultado.value
          }
        )
        if (status === 'success') {
          // llamar a funcion para comprobar el codigo
          validateCode(resultado.value)
        } else if (result.error_msg === 'El usuario no existe') {
          Swal.fire({
            title: '¡Recuperar contraseña!',
            text: 'El nombre de usuario no existe',
            icon: 'error',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Volver a intentar'
          }).then(result => {
            if (result.isConfirmed) {
              recoverPassword()
            }
          })
        } else {
          validateCode(resultado.value)
        }
      }
    })
  }
  const validateCode = async userName => {
    Swal.fire({
      title: '¡Recuperar contraseña!',
      text: 'Ingrese su código de recuperación',
      // use opt input
      input: 'text',
      inputPlaceholder: 'Código de recuperación',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      // validar que no sea nulo
      inputValidator: value => {
        if (!value) {
          return 'El código de recuperación es obligatorio'
        }
      }
      // validar que solo sean digitos y que tenga 6 caracteres
    }).then(async resultado => {
      if (resultado.value) {
        const { status } = await store.dispatch('authModule/checkCode', {
          userName: userName,
          code: resultado.value
        })
        if (status === 'success') {
          // swall para la nueva contraseña
          Swal.fire({
            title: '¡Recuperar contraseña!',
            text: 'Ingrese su nueva contraseña',
            input: 'password',
            inputPlaceholder: 'Nueva contraseña',
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            // validar que no tenga minimo 6 caracteres
            inputValidator: value => {
              // validar que tenga por lo menos 6 caracteres
              if (!value || value.length < 6) {
                return 'La contraseña debe tener al menos 6 caracteres'
              }
            }
          }).then(async resultado => {
            if (resultado.value) {
              const { status } = await store.dispatch('authModule/updatePassword', {
                userName: userName,
                newPassword: resultado.value
              })
              if (status === 'success') {
                Swal.fire({
                  title: '¡Recuperar contraseña!',
                  text: 'Contraseña actualizada',
                  icon: 'success'
                })
              }else{
                Swal.fire({
                  title: '¡Recuperar contraseña!',
                  text: 'Error al actualizar la contraseña',
                  icon: 'error'
                })
              }
            }
          })

        }else{
          Swal.fire({
            title: '¡Recuperar contraseña!',
            text: 'El código de recuperación es incorrecto',
            icon: 'error',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Volver a intentar'
          }).then(result => {
            if (result.isConfirmed) {
              validateCode(userName)
            }
          })
        }
      }
    })
  }

  const recoverUserNames = () => {
    //pedir el Correo
    Swal.fire({
      title: '¿Quieres recuperar tu nombre de usuario?',
      text: 'Ingresa tu correo',
      input: 'email',
      inputPlaceholder: 'Correo electrónico',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      validationMessage: 'El correo debe ser valido'
    }).then(async result => {
      if (result.value) {
        const email = result.value
        console.log(email)
        const response = await store.dispatch(
          'authModule/recoverUserNames',
          email
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
            text: 'El correo no existe',
            icon: 'error',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Volver a intentar'
          }).then(result => {
            if (result.isConfirmed) {
              recoverUserNames()
            }
          })
        }
      }
    })
  }

  const validLogin = ref(true)
  const validRegister = ref(true)
  const isLoading = ref(false)
  return {
    step: 1,
    isLoading,
    formLogin,
    formRegister,
    rulesLogin,
    rulesRegister,
    validLogin,
    validRegister,

    validateRegister,
    validateLogin,

    recoverPassword,
    recoverUserNames
  }
}
export default useAuth
