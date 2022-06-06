<template>
  <v-container>
    <v-row>
      <v-col>
        <v-container
          id="scroll-target"
          style="max-height: calc(86vh)"
          class="overflow-y-auto"
        >
          <v-row justify="center" style="height: 1000px"> 
            <v-col>
              <PostComponent user="all" imgAvatar="all" :isSearchedUser="false"/>
            </v-col>

          </v-row>
          
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostComponent from '../../profile/components/PostComponent'

export default {
  name: 'MainView',
  components: {
    PostComponent
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
</style>
