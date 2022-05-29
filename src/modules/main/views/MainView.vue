<template>
  <div>
    <NavBar />
    <!-- <ProfileView /> -->
    <FabSearch />
    <router-view />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import ProfileView from '../modules/profile/views/ProfileView.vue'
import FabSearch from '../components/FabSearch.vue'
export default {
  name: 'MainView',
  components: {
    NavBar,
    
    FabSearch
  }
}
</script>

<style lang="scss" scoped>
.pr {
  z-index: 9999;
}
</style>
