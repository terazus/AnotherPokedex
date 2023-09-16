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
import { mapState, mapMutations } from "vuex"
import URLParamHandler from "@/mixins/URLParamHandler"

export default {
  name: "SearchNames",
  mixins: [ URLParamHandler ],
  computed: {
    ...mapState('filters', ['nameFilter']),
    namesFilter: {
      get() { return this.nameFilter },
      set(value) {
        this.setNameFilter(value)
        this.setURLParameters("name", value)
      }
    },
  },
  methods: { ...mapMutations('filters', ["setNameFilter"]) }
}
</script>

<style scoped>

</style>
