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
import { mapState, mapActions } from "vuex"
import URLParamHandler from "@/mixins/URLParamHandler"


export default {
  name: "SearchAbilities",
  mixins: [ URLParamHandler ],
  computed: {
    ...mapState('filters', ["abilitiesValues", 'abilityFilter']),
    abilitiesFilter: {
      get() { return this.abilityFilter },
      set(value) {
        this.applyFilter({ mutationName: 'setAbilityFilter', value })
        this.setURLParameters("abilities", value)
      }
    },
  },
  methods: { ...mapActions('filters', ["applyFilter"]) }
}
</script>

<style scoped>

</style>
