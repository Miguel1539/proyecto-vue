<template>
  <v-card max-width="450" class="mx-auto">
   

    <v-list three-line dense>
      <template v-for="item in comentarios">
        <v-list-item :key="item.title">
          <v-list-item-content>
            <v-list-item-title
              ><strong>{{ item.user_name }}</strong></v-list-item-title
            >
            <v-list-item-subtitle
              ><span>{{ item.subtitle }}</span></v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    comentarios: [
      {
        user_name: 'Brunch ',
        subtitle: `<span class="text--primary">Ali Connors</span> &mAli Connors</span> &mAli Connors</span> &mAli Connors</span> &mAli Connors</span> &mAli Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
      },

      {
        user_name: 'Summer ',
        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`
      },

      {
        user_name: 'Oui oui',
        subtitle:
          '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
      },

      {
        user_name: 'Birthday ',
        subtitle:
          '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?'
      },
      {
        user_name: 'Recipe ',
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
      }
    ]
  })
}
</script>
