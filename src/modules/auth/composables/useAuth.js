import { ref } from '@vue/composition-api'

const useAuth = () => {
  const formLogin = ref({
    email: '',
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
    email: [
      v => !!v || 'El correo es obligatorio',
      v => /.+@.+\..+/.test(v) || 'El correo debe ser valido'
    ],
    password: [
      v => !!v || 'La contraseña es obligatoria'
    ]
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
    termsAndConditions: [
      v => !!v || 'Debe aceptar los términos y condiciones'
    ]
  })
  const validLogin = ref(true)
  const validRegister = ref(true)
  return {
    step: 2,
    formLogin,
    formRegister,
    rulesLogin,
    rulesRegister,
    validLogin,
    validRegister
    
  }
}
export default useAuth
