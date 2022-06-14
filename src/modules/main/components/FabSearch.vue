<template>
  <div>
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="300px"
      :overlay-opacity="0"
    >
      <v-card class="mx-auto pt-2" height="430">
        <!-- <v-system-bar></v-system-bar> -->

        <v-toolbar flat max-height="30">
          <!-- boton para cerrar dialog -->
          <v-btn icon @click="dialog = !dialog">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <v-text-field
            v-model="searchTerm"
            append-icon="mdi-magnify"
            label="Buscar usuarios"
            single-line
          ></v-text-field>
          <!-- @keyup="searchUser" -->
        </v-toolbar>

        <v-list three-line>
          <div v-for="(item, i) in listUsers" :key="i">
            <v-divider></v-divider>
            <v-list-item ripple @click="send(item.username)">
              <v-avatar color="white" size="48" class="avatar mr-3">
                <v-img :src="item.foto_perfil" alt="avatar" />
              </v-avatar>

              <v-list-item-content>
                <span
                  class="text-uppercase font-weight-regular text-caption"
                  v-text="item.username"
                ></span>

                <div v-text="item.descripcion"></div>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
      </v-card>
    </v-dialog>
    <v-btn
      fab
      color="cyan accent-2"
      bottom
      right
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>mdi-account-search</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
export default {
  setup() {
    const debounceTimeout = ref()
    const debounceValue = ref()
    const dialog = ref(false)
    const send = username => {
      dialog.value = !dialog.value
      router.push(`/profile-${username}`)
    }

    return {
      dialog,
      send,
      debounceValue,
      searchTerm: computed({
        get() {
          return debounceValue.value
        },
        set(val) {
          if (debounceTimeout.value) {
            clearTimeout(debounceTimeout.value)
          }
          debounceTimeout.value = setTimeout(() => {
            return store.dispatch('listaUsuariosModule/getListUsers', val)
          }, 500)
        }
      }),

      listUsers: computed(() => {
        return store.getters['listaUsuariosModule/getListUsers']
      })
    }
  },
  // data: () => ({
  //   items: [
  //     {
  //       image:
  //         'https://cdn-images-1.medium.com/max/1024/1*9C9hLji68wV373tk8okLYA.jpeg',
  //       description: 'TBI’s 5 Best: Sary Strong',
  //       username: 'paco3'
  //     },
  //     {
  //       image:
  //         'https://cdn-images-1.medium.com/max/1024/1*BBNtYUieAqHoXKjiJ2mMjQ.png',
  //       description: 'PWAs onod”',
  //       username: 'miguel2'
  //     },
  //     {
  //       image:
  //         'https://cdn-images-1.medium.com/max/1024/1*rTEtei1UEmNqbq6evRsExw.jpeg',
  //       description: 'How to Get Medur Business',
  //       username: 'Media'
  //     },
  //     {
  //       image:
  //         'https://cdn-images-1.medium.com/max/1024/1*FD2nkJewVeQnGf0ommQfrw.jpeg',
  //       description: 'The Pitfalls Of Outsicial Intelligence',
  //       username: 'Technology'
  //     },
  //     {
  //       image:
  //         'https://cdn-images-1.medium.com/max/1024/1*eogFpsVgNzXQLCVgFzT_-A.jpeg',
  //       description: 'Degrees of Freedom and Sudoko',
  //       username: 'Travel'
  //     }
  //   ],
  //   search: ''
  // }),
  // computed: {
  //   // keywords() {
  //   //   if (!this.search) return []

  //   //   const keywords = []

  //   //   for (const search of this.searching) {
  //   //     keywords.push(search.keyword)
  //   //   }

  //   //   return keywords
  //   // },
  //   searching() {
  //     // console.log('searching')
  //     if (!this.search) return this.items

  //     const search = this.search.toLowerCase()

  //     return this.items.filter(item => {
  //       const text = item.username.toLowerCase()

  //       return text.indexOf(search) > -1
  //     })
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.v-dialog__content {
  align-items: center;
  justify-content: flex-end;
}
</style>
