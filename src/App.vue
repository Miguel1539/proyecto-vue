<template>
  <v-app>
    <v-main v-if="false">
      <router-link :to="{name: 'about'}">about</router-link> \
      <router-link :to="{name: 'auth'}">contact</router-link> \
    </v-main>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>
<style>
/* ::-webkit-scrollbar {
display: none;
} */

</style>
