<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in getPublicaciones" :key="index">
        <v-card style="margin: 0 auto" max-width="700px">
          <v-img
            :src="item.foto"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title>{{item.descripcion}} </v-card-title>
          </v-img>

          <v-card-actions>
            <template>
              <v-list-item two-line>
                <v-list-item-avatar>
                  <img :src="getImgMainProfile" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ user }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-spacer></v-spacer>

            <v-btn icon @click="toggle(item)">
              <v-icon v-if="item.active">mdi-heart-outline</v-icon>
              <v-icon v-else color="error">mdi-heart</v-icon>
            </v-btn>
            <v-btn icon @click="drawer(item.ID_publicacion,index)">
              <v-icon>mdi-comment-text-outline</v-icon>
            </v-btn>
            
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-navigation-drawer
      v-for="(item, index) in getPublicaciones"
      :key="index"
      v-model="item.drawer"
      fixed
      temporary
      right
      width="400"
    >
    
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="imgAvatar"></v-img>
        </v-list-item-avatar>
        <v-list-item>
          <v-text-field
            style="width: 100px"
            v-model="comentarioUsuario"
            :rules="comentarioUsuarioRules"
            :counter="70"
            label="Comentario"
            required
          ></v-text-field>
        </v-list-item>
      </v-list-item>
      <v-list-item>
        <v-btn rounded color="primary" dark width="100%"> comentar </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <!-- <v-list dense> -->
      <!-- pitnar comentarios -->
      <!-- <v-list-tile-content>
          <v-list-tile-title>asdf</v-list-tile-title>
          
          <v-text>fda </v-text>
        </v-list-tile-content>
      </v-list> -->
      
      <v-card class="mx-auto" elevation="0">
        <v-list three-line dense>
          <template v-for="comment in item.comments">
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
import { ref,computed, onMounted } from '@vue/composition-api'
import store from '@/store'
import useProfile from '../../../composables/useProfile'


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
    }
  },
  setup() {
    onMounted(() => {
      store.dispatch('profileModule/getPostByUsername',[0,10])
    })

    const overlay = ref(false)

    const drawer = async (ID_publicacion,index) => {
      // console.log(ID_publicacion)
      overlay.value = true
      await store.dispatch('profileModule/getComments', [ID_publicacion,index])
      // setTimeout(() => {
      //   overlay.value = false
      // }, 2000);
      overlay.value = false
      store.commit('profileModule/changeDrawer',index)
    }
    const { getImgMainProfile } = useProfile()
    const comentarioUsuario = ref('')
    
    const comentarioUsuarioRules = [
      v => !!v || 'Comentario requerido',
      v => v.length <= 70 || 'Comentario debe tener menos de 70 caracteres'
    ]
    return {
      overlay,

      comentarioUsuario,
      
      comentarioUsuarioRules,

      getImgMainProfile,
      getPublicaciones: computed(() => store.getters['profileModule/getPublicaciones']),
      drawer
    }
  }
}
</script>
