<template>
  <div>
    <v-card class="mx-auto overflow-hidden">
      <v-app-bar color="blue" dark height="64px">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <v-img src="../../../assets/logo blanco.png"></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-list-item two-line class="nav-avatar">
            <!-- <v-list-item-avatar>
              <img src="../assets/genericUser2.jpg" />
              
            </v-list-item-avatar> -->
            <v-list-item-avatar>
              <v-menu bottom rounded offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn icon x-large v-on="on" class="boton">
                    <v-avatar color="white" size="48" class="avatar">
                      <v-img :src="getImgMainProfile" alt="avatar" />
                    </v-avatar>
                  </v-btn>
                </template>
                <v-card>
                  <v-list-item-content class="justify-center">
                    <div class="mx-auto text-center">
                      <v-avatar color="brown">
                        <v-img :src="getImgMainProfile" alt="avatar" />
                      </v-avatar>
                      <h3>{{username}}</h3>
                      <p class="text-caption mt-1">{{getEmail}}</p>
                      <v-divider class="my-3"></v-divider>
                      <v-btn depressed rounded text :to="{ name: 'profile' }">
                        Editar perfil
                      </v-btn>
                      <v-divider class="my-3"></v-divider>
                      <v-btn depressed rounded text @click="logout"> desconectarse </v-btn>
                    </div>
                  </v-list-item-content>
                </v-card>
              </v-menu>
            </v-list-item-avatar>

            <v-list-item-content class="text-style">
              <v-list-item-title>{{ username }}</v-list-item-title>
              <v-list-item-subtitle>Conectado</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-items>

        <v-btn icon @click="logout">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>

    <!--  -->

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <!--  -->
        <v-list-item-group
          v-model="group"
          active-class="blue--text text--accent-4"
        >
          <v-list-item :to="{ name: 'home' }">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'profile' }">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'favorites' }">
            <v-list-item-icon>
              <v-icon>mdi-heart</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Favoritos</v-list-item-title>
          </v-list-item>

          <!-- <v-list-item to="/profile-paco3">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>pruebas perfiles</v-list-item-title>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import useProfile from '../composables/useProfile'


export default {
  name: 'NavBar',

  setup() {
    const drawer = ref(false)
    const group = ref(null)
    const {getImgMainProfile,getEmail} = useProfile()
    return {
      drawer,
      group,

      username: computed(() => store.getters['authModule/getUserName']),
      logout: () => {
        store.commit('authModule/logout')
        store.commit('profileModule/clearProfile')
        router.push({ name: 'auth' })
      },


      getImgMainProfile,
      getEmail
    }
  }
}
</script>

<style lang="scss" scoped>
.ajuste {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.nav-avatar {
  padding: 0px;
}
.boton {
  position: fixed;
}
.text-style {
  padding-left: 10px;
}
.avatar {
  border-width: 2px;
  border-style: solid;
  border-color: white;
}
</style>
