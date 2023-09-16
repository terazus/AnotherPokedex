<template>
  <v-autocomplete
    v-model="abilitiesFilter"
    :items="abilitiesValues"
    outlined
    label="Abilities"
    chips
    clearable
    color="primary"
    hide-details
    class="mb-2"
  >
    <template #selection="{ item }">
      <v-chip color="primary black--text">
        {{ item }}
      </v-chip>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import URLParamHandler from "@/mixins/URLParamHandler"


export default {
  name: "SearchAbilities",
  mixins: [ URLParamHandler ],
  computed: {
    ...mapState('filters', ["abilitiesValues", 'abilityFilter']),
    abilitiesFilter: {
      get() { return this.abilityFilter },
      set(value) {
        this.setAbilityFilter(value)
        this.setURLParameters("abilities", value)
      }
    },
  },
  methods: { ...mapMutations('filters', ["setAbilityFilter"]) }
}
</script>

<style scoped>

</style>
