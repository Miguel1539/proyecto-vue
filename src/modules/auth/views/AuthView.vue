<template>
  <div style="height: 100%">
    <v-window v-model="step" style="height: 100%">
      <v-window-item :value="1" style="height: 100%">
        <v-row style="height: 102%">
          <v-col cols="12" md="6" class="d-flex align-content-center flex-wrap">
            <v-card-text class="mt-12" style="margin-top: 0 !important">
              <h1 class="text-center">Inicie sesión en su cuenta</h1>
              <v-form
                ref="forLogin"
                v-model="validLogin"
                lazy-validation
                @submit.prevent="validateLogin($refs.forLogin.validate())"
              >
                <v-row align="center" justify="center">
                  <v-col cols="12" sm="8">
                    <v-text-field
                      label="Nombre de usuario"
                      outlined
                      dense
                      color="blue"
                      autocomplete="false"
                      class="mt-16"
                      v-model="formLogin.userName"
                      :rules="rulesLogin.userName"
                    />
                    <v-text-field
                      label="Contraseña"
                      outlined
                      dense
                      color="blue"
                      autocomplete="false"
                      type="password"
                      v-model="formLogin.password"
                      :rules="rulesLogin.password"
                    />
                    <v-row justify="center" style="text-align: center">
                      <v-col cols="12" sm="5">
                        <a class="caption blue--text" @click="recoverPassword">Forgot password</a>
                      </v-col>
                      <v-col cols="12" sm="5">
                        <span class="caption blue--text">Forgot Username</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-btn
                          :loading="isLoading"
                          color="blue"
                          block
                          tile
                          type="submit"
                          :disabled="!validLogin || isLoading"
                          style="color: white"
                          >Log in</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="blue d-flex align-content-center flex-wrap"
          >
            <div style="text-align: center; margin: 0 auto">
              <v-card-text class="white--text">
                <h1 class="text-center">¿Aún no tienes una cuenta?</h1>
                <br />
                <h4 class="text-center">
                  Regístrate para ver fotos y vídeos de tus amigos.
                </h4>
              </v-card-text>
              <div class="text-center">
                <v-btn tile outlined dark @click="step++">SIGN UP</v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-window-item>
      <!-- intersección de formularios -->
      <v-window-item :value="2" style="height: 100%">
        <v-row id="alto-1">
          <v-col
            cols="12"
            md="6"
            class="blue d-flex align-content-center flex-wrap"
            style="height: 102%"
          >
            <div style="text-align: center; margin: 0 auto">
              <v-card-text class="white--text">
                <h1 class="text-center">¿Ya estás registrado?</h1>
                <br />
                <h4 class="text-center">Inicia sesión en tu cuenta</h4>
              </v-card-text>
              <div class="text-center">
                <v-btn tile outlined dark @click="step--">Log in</v-btn>
              </div>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="d-flex align-content-center flex-wrap alto-2"
          >
            <v-card-text class="mt-12">
              <v-form
                ref="forRegister"
                v-model="validRegister"
                lazy-validation
                @submit.prevent="validateRegister($refs.forRegister.validate())"
              >
                <v-row>
                  <v-col>
                    <h1 class="text-center">
                      Regístrese para obtener una cuenta
                    </h1>
                  </v-col>
                </v-row>
                <v-row align="center" justify="center">
                  <v-col cols="12" sm="8">
                    <v-text-field
                      label="Nombre de usuario"
                      counter="50"
                      outlined
                      dense
                      color="blue"
                      autocomplete="false"
                      v-model="formRegister.userName"
                      :rules="rulesRegister.userName"
                    />
                    <v-text-field
                      label="Correo electrónico"
                      outlined
                      dense
                      color="blue"
                      autocomplete="false"
                      v-model="formRegister.email"
                      :rules="rulesRegister.email"
                    />
                    <v-text-field
                      label="Contraseña"
                      outlined
                      counter="22"
                      dense
                      color="blue"
                      :autocomplete="false"
                      type="password"
                      v-model="formRegister.password"
                      :rules="rulesRegister.password"
                    />
                    <v-text-field
                      label="Confirmar contraseña"
                      outlined
                      counter="22"
                      dense
                      color="blue"
                      :autocomplete="false"
                      type="password"
                      v-model="formRegister.confirmPassword"
                      :rules="rulesRegister.confirmPassword"
                    />
                    <v-row>
                      <v-col cols="12" sm="7">
                        <v-checkbox
                          label="I Accept Terms & Conditions"
                          class="mt-n1"
                          color="blue"
                          v-model="formRegister.termsAndConditions"
                          :rules="rulesRegister.termsAndConditions"
                        >
                        </v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="5">
                        <span
                          class="caption blue--text ml-n4"
                          style="margin-left: 0 !important"
                          >Terms & Conditions</span
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-btn
                          :loading="isLoading"
                          color="blue"
                          block
                          tile
                          type="submit"
                          :disabled="!validRegister || isLoading"
                          style="color: white"
                          >Sign up</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import useAuth from '../composables/useAuth'

export default {
  setup() {
    
    const {
      step,
      formLogin,
      formRegister,
      rulesLogin,
      rulesRegister,
      validLogin,
      validRegister,
      validateLogin,
      validateRegister,
      isLoading,
      recoverPassword
      
    } = useAuth()
    return {
      step,
      formLogin,
      formRegister,
      rulesLogin,
      rulesRegister,
      validLogin,
      validRegister,
      isLoading,
      validateLogin,
      validateRegister,
      recoverPassword

      // validateLogin: () => {
      //   if (context.refs.forLogin.validate()) {
      //     isLoading.value = true
      //     setTimeout(() => {
      //       // simula una petición a la base de datos
      //       isLoading.value = false
      //     }, 2000)
      //   }
      // },
      // validateRegister: () => {
      //   if (context.refs.forRegister.validate()) {
      //     isLoading.value = true
      //     setTimeout(() => {
      //       // simula una petición a la base de datos
      //       isLoading.value = false
      //     }, 2000)
      //   }
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
#alto-1 {
  height: 100%;
}
// media query for mobile
@media (max-width: 960px) {
  #alto-1 {
    height: 30vh;
  }
  .alto-2 {
    height: 60vh;
  }
}
</style>
