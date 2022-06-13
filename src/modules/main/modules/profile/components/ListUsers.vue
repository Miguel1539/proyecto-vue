<template>
  <div class="posicion">
    <a @click="dialog = true">{{ action }}</a>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>{{ action }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 400px">
          <v-list three-line>
            <div v-for="(item, i) in listUsers" :key="i">
              <v-list-item ripple @click.self="send(item.username)">
                <v-avatar @click="send(item.username)" color="white" size="48" class="avatar mr-3">
                  <v-img :src="item.foto_perfil" alt="avatar" />
                </v-avatar>

                <v-list-item-content>
                  <span @click.self="send(item.username)"
                    class="text-uppercase font-weight-regular text-caption"
                    v-text="item.username"
                  ></span>
                  <div @click.self="send(item.username)" v-text="item.descripcion"></div>
                  <v-btn
                    dark
                    title
                    rounded
                    small
                    color="red"
                    v-if="!isFollowers"
                    @click.prevent="unFollow(item.username,i)"
                    >dejar de seguir</v-btn
                  >
                </v-list-item-content>
              </v-list-item>
            </div>
            <v-list-item-content v-if="empty">
              <h4>No tienes {{ action }}</h4>
            </v-list-item-content>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
export default {
  props: {
    action: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const dialog = ref(false)

    const send = username => {
      dialog.value = !dialog.value
      router.push(`/profile-${username}`)
    }
    const unFollow = async(username, index) => {
        // console.log(username, index)  
        await store.dispatch('profileModule/followUser', [username])
    }
    
    return {
      dialog,
      send,
      unFollow,
      isFollowers: computed(() => {
        if (props.action === 'Seguidores') {
          return true
        } else {
          return false
        }
      }),
      listUsers: computed(() => {
        if (props.action === 'Seguidores') {
          return store.getters['profileModule/getSeguidoresData']
        } else {
          return store.getters['profileModule/getSeguidosData']
        }
      }),
      empty: computed(() => {
        if (props.action === 'Seguidores') {
          return store.getters['profileModule/getSeguidoresData'].length === 0
        } else {
          return store.getters['profileModule/getSeguidosData'].length === 0
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: black;
  text-decoration: underline;
}
.posicion {
  display: inline-flex;
  margin-left: 2px;
  margin-right: 2px;
}
</style>
