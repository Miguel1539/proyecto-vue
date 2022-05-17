<template>
  <div>
    <NavBar />
    <!-- <ProfileView /> -->
    <router-view />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import ProfileView from '../modules/profile/views/ProfileView.vue'
export default {
  name: 'MainView',
  components: {
    NavBar,
    ProfileView
  }
}
</script>

<style lang="scss" scoped>
.pr {
  z-index: 9999;
}
</style>
