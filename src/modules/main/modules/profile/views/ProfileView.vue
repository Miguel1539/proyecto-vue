<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col>
        <v-container
          id="scroll-target"
          style="max-height: calc(86vh)"
          class="overflow-y-auto"
        >
          <!-- {{ isSearchedUser }} -->
          <!-- v-scroll:#scroll-target="" -->
          <!-- <v-row justify="center" style="height: 1000px"> -->
          <v-row justify="center" >
            <v-col>
              <v-card class="mx-auto" max-width="800" tile>
                <v-img
                  style="height: 190px"
                  :src="
                    isSearchedUser ? getImgBannerUserSearched : getImgBanner
                  "
                ></v-img>
                <v-col>
                  <v-avatar size="100" class="avatar">
                    <v-img
                      class="marco"
                      :src="
                        isSearchedUser
                          ? getImgMainProfileUserSearched
                          : getImgMainProfile
                      "
                    ></v-img>
                    <!-- src="../../../assets/genericUser2.jpg" -->
                  </v-avatar>
                </v-col>
                <v-list-item color="rgba(0, 0, 0, .4)">
                  <v-list-item-content>
                    <v-list-item-title class="title">
                      {{ isSearchedUser ? getUserNameUserSearched : username }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{
                        isSearchedUser ? getDescripcionUserSearched : descipcion
                      }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="mt-3">
                      <strong style="color: black">0</strong> Seguidores
                      <strong style="color: black">0</strong> Seguidos
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <DialogProfile
                    v-if="!isSearchedUser"
                    color="green"
                    icon="mdi-pencil"
                    option="editProfile"
                    :description="descipcion"
                  />
                </v-list-item>
              </v-card>
              <div class="publicar">
                <DialogProfile
                  v-if="!isSearchedUser"
                  color="green"
                  icon="mdi-upload"
                  option="addPost"
                />
              </div>
              <PostComponent :key="key"
                v-if="checkedUser"
                :user="isSearchedUser ? getUserNameUserSearched : username"
                :imgAvatar="getImgMainProfile"
                :isSearchedUser="isSearchedUser"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
import store from '@/store'
import useProfile from '../../../composables/useProfile'
import DialogProfile from '../components/DialogProfile'
import PostComponent from '../components/PostComponent'
import router from '@/router'

export default {
  name: 'ProfileView',
  components: {
    DialogProfile,
    PostComponent
  },
  setup(props, context) {
    const fab = ref(false)
    const {
      getImgMainProfile,
      getImgBanner,
      getImgMainProfileUserSearched,
      getImgBannerUserSearched,
      getUserNameUserSearched,
      getDescripcionUserSearched
    } = useProfile()
    return {
      fab,

      username: computed(() => store.getters['authModule/getUserName']),
      descipcion: computed(() => store.getters['profileModule/getDescripcion']),

      getImgMainProfile,
      getImgBanner,
      getImgMainProfileUserSearched,
      getImgBannerUserSearched,
      getUserNameUserSearched,
      getDescripcionUserSearched

      // usernameRouter,
    }
  },

  // PRACTICAMENTE OBLICADO A USAR LA VERSION DATA
  data() {
    return {
      key: 0,
      acutalPath: router.currentRoute.fullPath,
      isSearchedUser: false,
      checkedUser: false
    }
  },
  // watch url to change
  watch: {
    $route: function (to, from) {
      this.key++
      this.checkedUser = false
      store.commit('profileModule/clearPublicaciones')
      store.commit('profileModule/clearPublicacionesUserSearched')
      this.acutalPath = to.fullPath
      // console.log(this.acutalPath)
      // console.log(to.params.username)
      if (to.params.username) {
        store
          .dispatch('profileModule/searchedUser', [to.params.username])
          .then(result => {
            this.isSearchedUser = result
            this.checkedUser = true
          })
      } else {
        this.isSearchedUser = false
        this.checkedUser = true
      }
    }
  },
  mounted() {
          this.checkedUser = false

    if (router.currentRoute.params.username) {
      store
        .dispatch('profileModule/searchedUser', [
          router.currentRoute.params.username
        ])
        .then(result => {
          this.isSearchedUser = result
          this.checkedUser = true
        })
    } else {
      this.isSearchedUser = false
      this.checkedUser = true
    }
  }
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
}
::-webkit-scrollbar-thumb {
  background-image: linear-gradient(45deg, #00aeff, #a68eff);
  border-radius: 10px;
  // -webkit-box-shadow: rgba(0,0,0,.12) 0 3px 13px 1px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1); // <- Add this to fix.
  background-color: #000;
}
.avatar {
  position: absolute;
  top: 37%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.marco {
  border-width: 4px;
  border-style: solid;
  border-color: white;
}
.publicar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
