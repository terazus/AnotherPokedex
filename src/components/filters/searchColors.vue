<template>
  <v-autocomplete
    v-model="colorsFilter"
    :items="colorsValues"
    outlined
    label="Color"
    clearable
    color="primary"
    hide-details
    class="mb-2"
  >
    <template #item="{ item }">
      <PokemonColor :color="item" />
      <span class="ml-2"> {{ item }} </span>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapState, mapActions } from "vuex"
import URLParamHandler from "@/mixins/URLParamHandler"
import PokemonColor from "@/components/pokemonColor.vue"

export default {
  name: "SearchColors",
  components: { PokemonColor },
  mixins: [ URLParamHandler ],
  computed: {
    ...mapState('filters', ["colorFilter", 'colorsValues']),
    colorsFilter: {
      get() { return this.colorFilter },
      set(value) {
        this.applyFilter({ mutationName: 'setColorFilter', value })
        this.setURLParameters("color", value)
      }
    },
  },
  methods: { ...mapActions('filters', ["applyFilter"]) }
}
</script>

<style scoped>

</style>
