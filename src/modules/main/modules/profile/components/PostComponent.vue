<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in items" :key="index">
        <v-card style="margin: 0 auto" max-width="700px">
          <v-img
            :src="item.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title>Descipcion opcional </v-card-title>
          </v-img>

          <v-card-actions>
            <template>
              <v-list-item two-line>
                <v-list-item-avatar>
                  <img src="https://randomuser.me/api/portraits/women/81.jpg" />
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
            <v-btn icon @click="item.drawer = !item.drawer">
              <v-icon>mdi-comment-text-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-navigation-drawer
      v-for="(item, index) in items"
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
          <template v-for="comment in item.comentarios">
            <v-list-item :key="comment.id">
              <v-list-item-content>
                <v-list-item-title
                  ><strong>{{ comment.user_name }}</strong></v-list-item-title
                >
                <v-list-item-subtitle
                  ><span>{{ comment.comment }}</span></v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
// import Drawer from "./Drawer.vue";
import { ref } from '@vue/composition-api'
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
    const comentarioUsuario = ref('')
    const items = ref(null)
    const inicializaitmspruebas = () => {
      return [
        {
          active: true,
          drawer: false,
          src: 'https://picsum.photos/1920/1080?random=1',
          comentarios: [
            {
              id: 1,
              user_name: 'Brunch ',
              comment: `<span class="text--primary">Ali Connors</span> &mAli Connors</span> &mAli Connors</span> &mAli Connors</span> &mAli Connors</span> &mAli Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
            },

            {
              id: 2,
              user_name: 'Summer ',
              comment: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`
            },

            {
              id: 3,
              user_name: 'Oui oui',
              comment:
                '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
            },

            {
              id: 4,
              user_name: 'Birthday ',
              comment:
                '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?'
            },
            {
              id: 5,
              user_name: 'Recipe ',
              comment:
                '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
            },
            {
              id: 12,
              user_name: 'Recipe ',
              comment:
                '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
            },
            {
              id: 13,
              user_name: 'Recipe ',
              comment:
                '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
            },
            {
              id: 14,
              user_name: 'Recipe ',
              comment:
                '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
            },
            {
              id: 15,
              user_name: 'Recipe ',
              comment:
                '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
            }
          ]
        },
        {
          active: true,
          drawer: false,
          src: 'https://picsum.photos/1920/1080?random=2',
          comentarios: [
            {
              id: 6,
              user_name: 'Juan1',
              comment: 'Hola'
            },
            {
              id: 7,
              user_name: 'Pedro1',
              comment: 'Hola'
            }
          ]
        },
        {
          active: true,
          drawer: false,
          src: 'https://picsum.photos/1920/1080?random=3',
          comentarios: [
            {
              id: 8,
              user_name: 'Juan2',
              comment: 'Hola'
            },
            {
              id: 9,
              user_name: 'Pedro2',
              comment: 'Hola'
            }
          ]
        },
        {
          active: true,
          drawer: false,
          src: 'https://picsum.photos/1920/1080?random=4',
          comentarios: [
            {
              id: 10,
              user_name: 'Juan3',
              comment: 'Hola'
            },
            {
              id: 11,
              user_name: 'Pedro3',
              comment: 'Hola'
            }
          ]
        },
        {
          active: true,
          drawer: false,
          src: 'https://picsum.photos/1920/1080?random=5'
        }
      ]
    }
    items.value = inicializaitmspruebas()
    const comentarioUsuarioRules = [
      v => !!v || 'Comentario requerido',
      v => v.length <= 70 || 'Comentario debe tener menos de 70 caracteres'
    ]
    return {
      comentarioUsuario,
      items,
      comentarioUsuarioRules
    }
  }
}
</script>
