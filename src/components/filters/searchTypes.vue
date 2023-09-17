<template>
  <v-autocomplete
    v-model="typesFilter"
    :items="typesValues"
    outlined
    label="Type"
    multiple
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
  name: "SearchTypes",
  mixins: [ URLParamHandler ],
  computed: {
    ...mapState('filters', ["typesValues", 'typeFilter']),
    typesFilter: {
      get() { return this.typeFilter },
      set(value) {
        this.applyFilter({ mutationName: 'setTypesFilter', value })
        this.setURLParameters("types", value.join(','))
      }
    },
  },
  methods: { ...mapActions('filters', ["applyFilter"]) }
}
</script>

<style scoped>

</style>
