<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template>
      <v-snackbar :timeout="3000" top :color="colorSnackbar" v-model="snackbar">
        <div v-for="(error, index) in text" :key="index">
          {{ error }}<br /><br />
        </div>
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        dark
        title
        rounded
        small
        :color="color"
        v-bind="attrs"
        v-on="on"
        v-if="editProfile"
      >
        <v-icon>{{ icon }}</v-icon>
        Editar perfil
      </v-btn>
      <v-btn
        dark
        title
        rounded
        small
        :color="color"
        v-bind="attrs"
        v-on="on"
        v-else
      >
        <v-icon>{{ icon }}</v-icon>
        Añadir publicación
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Configuración</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="save" v-if="editProfile"> Guardar </v-btn>
          <v-btn dark text v-else> Subir </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader v-if="editProfile">
        <v-subheader>informacion del usuario</v-subheader>
        <v-row class="ancho-campos">
          <v-col>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Imagen par el avatar</v-list-item-title>
                <v-file-input
                  v-model="selectedImgAvatar"
                  :rules="rules"
                  accept="image/png, image/jpeg"
                  placeholder="selecciona un avatar"
                  prepend-icon="mdi-camera"
                  label="Avatar"
                ></v-file-input>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <v-row class="ancho-campos">
          <v-col>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Imagen par el banner</v-list-item-title>
                <v-file-input
                  v-model="selectedImgBanner"
                  :rules="rules"
                  accept="image/png, image/jpeg"
                  placeholder="selecciona un avatar"
                  prepend-icon="mdi-camera"
                  label="Avatar"
                ></v-file-input>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <v-row class="ancho-campos">
          <v-col>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Descipción</v-list-item-title>
                <v-textarea
                  filled
                  auto-grow
                  label="Descipción"
                  rows="2"
                  row-height="30"
                  shaped
                  v-model="description"
                  :rules="rulesOfDesciption"
                  counter="200"
                ></v-textarea>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
      <v-list three-line subheader v-else>
        <v-subheader>informacion de la publicación</v-subheader>
        <v-row class="ancho-campos">
          <v-col>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Imagen para la publicación</v-list-item-title>
                <v-file-input
                  v-model="selectedImgPost"
                  :rules="rules"
                  accept="image/png, image/jpeg"
                  placeholder="selecciona una imagen para la publicación"
                  prepend-icon="mdi-camera"
                  label="Avatar"
                ></v-file-input>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <v-row class="ancho-campos">
          <v-col>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Título para la publicación</v-list-item-title>
                <v-textarea
                  filled
                  auto-grow
                  label="Descipción"
                  rows="2"
                  row-height="30"
                  shaped
                  v-model="description"
                  :rules="rulesOfDesciption"
                  counter="70"
                ></v-textarea>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import store from '@/store'

export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    option: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const dialog = ref(false)
    const rules = [
      value =>
        !value ||
        value.size < 2000000 ||
        'El tamaño de la imagen debe ser inferior a 2 MB!',
      // check if the file is an image jpeg or png
      value =>
        !value ||
        value.type === 'image/jpeg' ||
        value.type === 'image/png' ||
        'La Imagen debe ser un archivo de tipo: jpeg, png'
    ]
    const rulesOfDesciption = [
      value =>
        !value ||
        value.length < 200 ||
        'La descripción debe ser inferior a 200 caracteres!'
    ]
    const selectedImgAvatar = ref(null)
    const selectedImgBanner = ref(null)
    const selectedImgPost = ref(null)
    const snackbar = ref(false)
    const text = ref([])
    const description = ref(store.getters['profileModule/getDescripcion'])
    const oldDesciption = store.getters['profileModule/getDescripcion']
    const colorSnackbar = ref('error')
    const save = async () => {
      let error = 0
      let imgAvatar = false
      let imgBanner = false
      let modDescripcion = false
      // comprobar si existe img para Avatar
      if (selectedImgAvatar.value) {
        // comprobar que sea del tipo correcto y pintar un log de acierto
        if (
          selectedImgAvatar.value.type === 'image/jpeg' ||
          selectedImgAvatar.value.type === 'image/png'
        ) {
          // comporbar que el tamaño sea menor a 2 MB
          if (selectedImgAvatar.value.size < 2000000) {
            imgAvatar = true
          } else {
            selectedImgAvatar.value = null
            error++
            text.value.push(
              'El tamaño de la imagen del avatar debe ser inferior a 2 MB!'
            )
          }
        } else {
          // borrar el continido del input
          selectedImgAvatar.value = null
          error++
          text.value.push('La imagen de avatar no es del tipo correcto')
        }
      }
      // comprobar si existe img para Banner
      if (selectedImgBanner.value) {
        // comprobar que sea del tipo correcto y pintar un log de acierto
        if (
          selectedImgBanner.value.type === 'image/jpeg' ||
          selectedImgBanner.value.type === 'image/png'
        ) {
          // comporbar que el tamaño sea menor a 2 MB
          if (selectedImgBanner.value.size < 2000000) {
            imgBanner = true
          } else {
            selectedImgBanner.value = null
            error++
            text.value.push(
              'El tamaño de la imagen del banner debe ser inferior a 2 MB!'
            )
          }
        } else {
          // borrar el continido del input
          selectedImgBanner.value = null
          error++
          text.value.push('La imagen de banner no es del tipo correcto')
        }
      }
      // comprobar si existe modificacion en la descripcion
      if (description.value !== oldDesciption) {
        if (description.value.length <= 200) {
          // comprobar que la descripcion no sea mayor a 200 caracteres
          modDescripcion = true
        } else {
          error++
          text.value.push('La descripción debe ser inferior a 200 caracteres!')
          // console.log('La descripción debe ser inferior a 200 caracteres');
        }
      }
      // comprobar si hay algun error
      if (error > 0) {
        // mostrar snackbar
        snackbar.value = true
        // mostrar texto de error
      } else {
        // comprobar si existe modificacion en la descripcion
        if (modDescripcion) {
          // modificar la descripcion
          await store.dispatch('profileModule/updateProfile', [
            description.value,
            'descripcion'
          ])
        }
        // comprobar si existe modificacion en la imagen de avatar
        if (imgAvatar) {
          // modificar la imagen de avatar
          await store.dispatch('profileModule/updateProfile', [
            selectedImgAvatar.value,
            'avatar'
          ])
        }
        // comprobar si existe modificacion en la imagen de banner
        if (imgBanner) {
          // modificar la imagen de banner
          await store.dispatch('profileModule/updateProfile', [
            selectedImgBanner.value,
            'banner'
          ])
        }
        // mostrar snackbar
        snackbar.value = true
        colorSnackbar.value = 'success'
        // mostrar texto de exito
        text.value = []
        text.value.push('Se han guardado los cambios')
      }
    }

    return {
      snackbar,
      text,
      dialog,
      rules,
      rulesOfDesciption,
      colorSnackbar,
      description,
      selectedImgAvatar,
      selectedImgBanner,
      selectedImgPost,

      save,

      editProfile: computed(() => {
        if (props.option == 'editProfile') {
          return true
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ancho-campos {
  width: 100%;
}
</style>
