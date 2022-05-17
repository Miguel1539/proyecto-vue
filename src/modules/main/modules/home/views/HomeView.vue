<template>
  <div>
    <!-- <DialogProfile color="green" icon="mdi-pencil" /> -->
    <v-container>
    <v-row class="text-center">
      <v-col col="12">
        <v-card id="create">
          <v-container fluid style='height: 300px'></v-container>
          <v-speed-dial
            v-model="fab"
            bottom
            direction="top"
            :open-on-hover="false"
            transition="slide-y-reverse-transition"
            :value="false"
          >
            <template v-slot:activator>
              <v-btn v-model="fab" color="blue darken-2" dark fab @click.stop="fab=!fab">
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <v-btn fab dark small color="green">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn fab dark small color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  </div>
</template>

<script>
import DialogProfile from '../../profile/components/DialogProfile'
export default {
  data: () => ({
    fab: false,
  }),
  components: {
    DialogProfile
  },
  props: {
    value: Boolean
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('change', value)
        this.$emit('input', value)
      }
    }
  },
  mounted() {
    // Apply a @click.stop to the .v-speed-dial__list that wraps the default slot
    this.$el
      .querySelector('.v-speed-dial__list')
      .addEventListener('click', e => {
        e.stopPropagation()
      })
  }
}
</script>

<style lang="scss" scoped></style>
