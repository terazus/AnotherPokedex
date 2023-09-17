<template>
  <v-text-field
    v-model="namesFilter"
    outlined
    label="Pokemon name"
    hide-details
    class="mb-2"
  />
</template>

<script>
import { mapState, mapActions } from "vuex"
import URLParamHandler from "@/mixins/URLParamHandler"

export default {
  name: "SearchNames",
  mixins: [ URLParamHandler ],
  computed: {
    ...mapState('filters', ['nameFilter']),
    namesFilter: {
      get() { return this.nameFilter },
      set(value) {
        this.applyFilter({ mutationName: 'setNameFilter', value })
        this.setURLParameters("name", value)
      }
    },
  },
  methods: { ...mapActions('filters', ["applyFilter"]) }
}
</script>

<style scoped>

</style>
