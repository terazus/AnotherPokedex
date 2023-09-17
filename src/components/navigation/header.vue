<template>
  <div
    class="pa-0"
    @click="resetFilters()"
  >
    <nuxt-link
      to="/"
      class="white--text"
    >
      <v-toolbar-title
        class="text-body-1 righteous"
      >
        {{ title.toUpperCase() }}
      </v-toolbar-title>
    </nuxt-link>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "NavigationHeader",
  data () { return { title: 'Pokedex' } },
  methods: { ...mapActions('filters', ["resetFilters"]) }
}
</script>

<style scoped>

</style>
