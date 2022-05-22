<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col>
        <v-container
          id="scroll-target"
          style="max-height: calc(86vh)"
          class="overflow-y-auto"
        >
          <!-- v-scroll:#scroll-target="" -->
          <v-row justify="center" style="height: 1000px">
            <v-col>
              <v-card class="mx-auto" max-width="800" tile>
                <v-img style="height: 190px" :src="getImgBanner"></v-img>
                <v-col>
                  <v-avatar size="100" class="avatar">
                    <v-img class="marco" :src="getImgMainProfile"></v-img>
                    <!-- src="../../../assets/genericUser2.jpg" -->
                  </v-avatar>
                </v-col>
                <v-list-item color="rgba(0, 0, 0, .4)">
                  <v-list-item-content>
                    <v-list-item-title class="title">{{
                      username
                    }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{descipcion}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="mt-3">
                      <strong style="color: black">0</strong> Seguidores
                      <strong style="color: black">0</strong> Seguidos
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <DialogProfile color="green" icon="mdi-pencil" option="editProfile" :description="descipcion"/>
                </v-list-item>
              </v-card>
              <div class="publicar">
                <DialogProfile color="green" icon="mdi-upload" option="addPost" />
              </div>
                
            <PostComponent :user="username" :imgAvatar="getImgMainProfile" />
              
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

export default {
  name: 'ProfileView',
  components: {
    DialogProfile,
    PostComponent
  },
  setup() {
    const fab = ref(false)
    const { getImgMainProfile, getImgBanner } = useProfile()

    return {
      fab,

      username: computed(() => store.getters['authModule/getUserName']),
      descipcion: computed(() => store.getters['profileModule/getDescripcion']),

      getImgMainProfile,
      getImgBanner
    }
  }
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 15px;
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
.publicar{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
