<template>
  <div>
    {{ aboutTitle }}
  <input type="text" v-model="aboutTitle">
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
  name: 'AboutView',
  setup() {
    const aboutTitle = ref('About')

    return {
      aboutTitle
    }
  }
}
</script>

<style lang="scss" scoped></style>
