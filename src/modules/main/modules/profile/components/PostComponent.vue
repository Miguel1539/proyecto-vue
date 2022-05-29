<template>
  <v-container id="scroll-target">
    <!-- {{getPublicaciones}} -->
    <v-row v-scroll:#scroll-target="onScroll">
      <!-- {{isSearchedUser}},,,,{{getPublicaciones}} -->
      <!-- {{isSearchedUser}} -->
      <v-col v-for="(item, index) in getPublicaciones" :key="index">
        <v-card style="margin: 0 auto" max-width="700px">
          <v-img
            :src="item.foto"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title>{{ item.descripcion }}</v-card-title>
          </v-img>

          <v-card-actions>
            <template>
              <v-list-item two-line>
                <v-list-item-avatar>
                  <v-img
                    :src="
                      isSearchedUser
                        ? getImgMainProfileUserSearched
                        : getImgMainProfile
                    "
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ user }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-spacer></v-spacer>

            <v-btn icon @click="setLike(item.ID_publicacion, index)">
              <v-icon v-if="item.active">mdi-heart-outline</v-icon>
              <v-icon v-else color="error">mdi-heart</v-icon>
            </v-btn>
            <v-btn icon @click="drawer(item.ID_publicacion, index)">
              <v-icon>mdi-comment-text-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        style="display: flex; justify-content: center; align-items: center"
      >
        <v-progress-circular
          v-show="isLoadingPosts"
          :size="60"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>

    <!-- v-for="(item, index) in getPublicaciones"
      :key="index"
      v-model="item.drawer" -->
    <v-navigation-drawer v-model="showDrawer" fixed temporary right width="400">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="imgAvatar"></v-img>
        </v-list-item-avatar>
        <v-list-item>
          <v-text-field
            v-model="comentarioUsuario"
            :rules="comentarioUsuarioRules"
            :counter="70"
            label="Comentario"
            required
            @keypress.enter="addComent"
          ></v-text-field>
        </v-list-item>
      </v-list-item>
      <v-list-item>
        <v-btn rounded color="primary" dark width="100%" @click="addComent">
          <!-- @click="addComent(item.ID_publicacion)" -->
          comentar
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>
      <v-alert
        v-show="alertError"
        border="right"
        colored-border
        type="error"
        elevation="0"
        transition="scale-transition"
      >
        El comentario debe tener un formato valido
      </v-alert>
      <v-list-item v-if="isLoading">
        <v-progress-circular
          :size="60"
          :width="7"
          color="purple"
          indeterminate
          style="margin: 0 auto"
        ></v-progress-circular>
      </v-list-item>
      <!-- <v-list dense> -->
      <!-- pitnar comentarios -->
      <!-- <v-list-tile-content>
          <v-list-tile-title>asdf</v-list-tile-title>
          
          <v-text>fda </v-text>
        </v-list-tile-content>
      </v-list> -->

      <v-card class="mx-auto" elevation="0">
        <v-list three-line dense v-if="showDrawer">
          <template
            v-for="comment in getPublicaciones[indexPublicacionSelected]
              .comments"
          >
            <v-list-item :key="comment.ID_comentario">
              <v-list-item-content>
                <v-list-item-title
                  ><strong>{{ comment.username }}</strong></v-list-item-title
                >
                <v-list-item-subtitle
                  ><span>{{ comment.comentario }}</span></v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-navigation-drawer>
    <v-overlay :value="overlay">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
// import Drawer from "./Drawer.vue";
import { ref, computed, onMounted } from '@vue/composition-api'
import store from '@/store'
import useProfile from '../../../composables/useProfile'
import router from '@/router'

export default {
  name: 'Post',
  components: {
    // Drawer,
  },
  props: {
    user: {
      type: String,
      required: true
    },
    imgAvatar: {
      type: String,
      required: true
    },
    isSearchedUser: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    // const isSearchedUser = ref(false)

    // onMounted(() => {
    //   const v = store.getters['profileModule/getUserName']

    //   if (v != props.user){
    //     console.log('cambio de usuario')
    //   } else {
    //     console.log('no cambio de usuario')
    //   }
    // // store.dispatch('profileModule/getPostByUsername', [0, 10])

    // })
    //test
    // const test = ref(false)
    const offsetTop = ref(0)
    const page = ref(10)
    const stopPage = ref(false)
    const isLoadingPosts = ref(false)
    const onScroll = async e => {
      // offsetTop.value = e.target.scrollTop
      // sacar el tamaño maxiomo de el scroll

      const maxScroll = e.target.scrollHeight - e.target.clientHeight
      // calcular el porcentaje de scroll
      const scrollPercent = Math.round((e.target.scrollTop / maxScroll) * 100)

      // console.log(scrollPercent)
      // if (e.target.scrollTop == maxScroll) {
      if (scrollPercent == 92) {
        if (stopPage.value) {
          return
        } else {
          isLoadingPosts.value = true
          let config
          if (props.isSearchedUser) {
            config = [page.value, 10, props.user]
          } else {
            config = [page.value, 10]
          }
          // console.log(config)
          const result = await store.dispatch(
            'profileModule/getPostByUsername',
            config
          )
          page.value += 10
          stopPage.value = result
          isLoadingPosts.value = false
        }
        // const result =  await store.dispatch('profileModule/getPostByUsername', [page.value, (page.value + 10)])

        // page.value = page.value + 10
      }
    }
    // ()

    let ID_publicacionSelected = null

    const { getImgMainProfile, getImgMainProfileUserSearched } = useProfile()

    const showDrawer = ref(false)
    const isLoading = ref(false)
    const alertError = ref(false)
    const overlay = ref(false)
    const comentarioUsuario = ref('')
    const indexPublicacionSelected = ref(null)

    const drawer = async (ID_publicacion, index) => {
      ID_publicacionSelected = ID_publicacion
      indexPublicacionSelected.value = index
      // console.log(ID_publicacion)
      overlay.value = true
      let config
      if (props.isSearchedUser) {
        config = [ID_publicacion, index, props.isSearchedUser]
      } else {
        config = [ID_publicacion, index, props.isSearchedUser]
      }
      await store.dispatch('profileModule/getComments', config)
      // setTimeout(() => {
      //   overlay.value = false
      // }, 2000);
      await setTimeout(() => {
        overlay.value = false
      }, 200)
      if (props.isSearchedUser) {
        store.commit('profileModule/changeDrawerUserSearched', index)
        } else {
        store.commit('profileModule/changeDrawer', index)
      }
      showDrawer.value = true
    }

    const addComent = async () => {
      // comprobar que tenga un comentario mayor a 10 caracteres
      // console.log()

      if (comentarioUsuario.value.length >= 10) {
        isLoading.value = true
        await store.dispatch('profileModule/addComment', [
          ID_publicacionSelected,
          indexPublicacionSelected.value,
          comentarioUsuario.value
        ])

        // fake http request promise 4 seconds
        // await new Promise(resolve => setTimeout(resolve, 4000))
        isLoading.value = false
      } else {
        // console.log('va por aqui')
        alertError.value = true
        setTimeout(() => {
          alertError.value = false
        }, 4000)
      }
    }

    const setLike = async (id, index) => {
      await store.dispatch('profileModule/setLike', [id, index,props.isSearchedUser])
    }

    const comentarioUsuarioRules = [
      v => v.length > 9 || 'El comentario debe tener al menos 10 caracteres',
      v => v.length <= 70 || 'Comentario debe tener menos de 70 caracteres'
    ]
    return {
      overlay,
      isLoading,
      alertError,
      indexPublicacionSelected,

      comentarioUsuario,

      comentarioUsuarioRules,

      addComent,

      setLike,

      getImgMainProfile,
      getImgMainProfileUserSearched,
      // getPublicaciones: computed(() => {
      //   if (props.isSearchedUser) {
      //     console.log('isSearchedUser')
      //   } else {
      //     store.getters['profileModule/getPublicaciones']
      //   }
      // }),
      getPublicaciones: computed(() => {
        if (props.isSearchedUser) {
          return store.getters['profileModule/getPublicacionesUserSearched']
        } else {
          return store.getters['profileModule/getPublicaciones']
        }
      }),

      drawer,
      showDrawer,

      // infinite scroll-target
      offsetTop,
      onScroll,
      isLoadingPosts
      // test
      // test,
    }
  },
  data() {
    return {
      searchedUser: router.currentRoute.params.username
    }
  },
  watch: {
    $route: function (to, from) {
      // console.log(to.params.username)
      const v = localStorage.getItem('userName')
      // console.log(this.user)
      // if (v != this.user){
      //   console.log('cambio de usuario')
      //   store.dispatch('profileModule/getPostByUsername', [10, 10])
      // } else {
      //   store.dispatch('profileModule/getPostByUsername', [0, 10])
      // }
    }
  },
  mounted() {
    // sacar user de local storage si esta
    const v = localStorage.getItem('userName')
    // console.log(v)
    // console.log(this.user)
    // console.log(this.user);
    if (v == this.user) {
      // console.log('cambio de usuario')
      // store.dispatch('profileModule/getPostByUsername', [10, 10])
      store.dispatch('profileModule/getPostByUsername', [0, 10])
    } else {
      // store.dispatch('profileModule/getPostByUsername', [0, 10])
      store.dispatch('profileModule/getPostByUsername', [0, 10, this.user])
    }
  }
}
</script>
